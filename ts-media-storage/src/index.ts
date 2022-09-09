/**
 * @klotho::execution_unit {
 *   id = "media-file-api"
 * }
 */

import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const port = 3000
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});
const upload = multer({ storage: storage });

const { router, app } = setupExpressApp();

/* @klotho::persist {
 *   id = "cloudFs"
 * }
 */
import cloudEnabledFS = require("fs/promises");

/**
* Persists the native Javascript Map when compiled
* @klotho::persist {
*   id = "mediaKV"
* }
*/
const mediaStore = new Map<string, string>();


function setupExpressApp() {
  const app: any = express();
  const router = express.Router();
  const cors = require('cors');
  router.use(cors());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  return { router, app };
}

function getStoragePath(id: string) {
  return (process.env["CLOUDCC_NAMESPACE"]) ? `/media/${id}` : `/tmp/${id}`;
}

function getStoredFileName(filePath: string) {
  const separator = process.env["CLOUDCC_NAMESPACE"] ? "/" : path.sep;
  return filePath.split(separator).pop();
}

router.get('/', async (req, res) => {
  res.send("Hello from Klotho!");
});

router.get('/v1/metadata/:id', async (req, res) => {
  const path = await mediaStore.get(req.params.id);
  if (path) {
    res.status(200).send(path);
  } else {
    res.status(404).send(`No media file path found for id ${req.params.id}`);
  }
});

router.get('/v1/media/:id', async (req, res) => {
  const id = req.params.id
  const path = await mediaStore.get(id);
  if (path) {
    const fileName = getStoredFileName(id);
    const file = await cloudEnabledFS.readFile(getStoragePath(id));
    res.status(200)
      .contentType(fileName)
      .send(file);
  }
  else {
    res.status(404).send(`No media file path found for id ${id}`);
  }
});

router.post('/v1/media/:id',upload.single('media_file'), async (req, res) => {
  console.log("start post")
  try {
    const storagePath = getStoragePath(req.params.id);
    console.log(`path: ${storagePath}`)
    // use non-annotated fs to read media file from /tmp/
    const readStream = fs.createReadStream(req.file.path);
    // use annotated fs to write file to cloud file store
    const resultUrl = (await cloudEnabledFS.writeFile(storagePath, readStream, { flag: "w+" })) as any;
    const url = resultUrl ? resultUrl : storagePath;
    // save the cloud stored object access url to annotated KV
    console.log(`url: ${url}`)
    await mediaStore.set(req.params.id, url);
    // remove the local copy of the media file from /tmp/
    fs.rmSync(req.file.path);
    console.log("record updated")
    res.status(201).send(`Uploaded media file to ${storagePath}`);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      err: err,
      msg: "Error Happened"
    });
  }
});

router.delete('/v1/media/:id', async (req, res) => {
  // This isn't supported in cloud deployments yet. Will work locally though
  const exists = await mediaStore.has(req.params.id);
  console.log(`Media file exists: ${exists}`);
  if (exists) {
    const path = (await mediaStore.get(req.params.id)) as string;
    await cloudEnabledFS.rm(path);
    await mediaStore.delete(path);
    res.status(204).end();
  } else {
    res.status(404).send(`No media file found for id: ${req.params.id}`);
  }
})

/* @klotho::expose {
 *   target = "public"
 *   id = "app"
 * }
 */
app.listen(port, async () => {
  console.log(`App listening locally on port ${port}`);
})

app.use(router);

exports.app = app;
