import * as express from 'express';
import * as fs from 'fs';
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.png') //Appending .png
  }
})
var upload = multer({ storage: storage })

const { router, app } = setupExpressApp();

/* @klotho::persist {
 * id = "cloudFs"
 * }
 */
import cloudEnabledFS = require("fs/promises");

/**
* Persists the native Javascript Map when compiled
* @klotho::persist {
*  id = "imageKV"
* }
*/
let imageStore = new Map<string, string>();

function setupExpressApp() {
  const app: any = express();
  const router = express.Router();
  let cors = require('cors');
  router.use(cors());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  return { router, app };
}

function generateImagePath(id: string) {
  if (process.env["CLOUDCC"] != "true") {
    return `/tmp/${id}.png`
  } else {
    return `/images/${id}.png`
  }
}

router.get('/', async (req, res) => {
  res.send("Hello from Klotho!");
});

router.get('/v1/images/:id', async (req, res) => {
  let path = await imageStore.get(req.params.id);
  if (path) {
    res.status(200).send(path)
  } else {
    res.status(404).send(`No image path found for id ${req.params.id}`)
  }
});

router.post('/v1/images/:id', upload.single('image'), async (req, res) => {
  try {
    const imagePath = generateImagePath(req.params.id)
    // use non-annotated fs to read image from /tmp/
    const readStream = fs.createReadStream(req.file.path);
    // use annotated fs to write file to cloud file store
    const resultUrl = (await cloudEnabledFS.writeFile(imagePath, readStream, { flag: "w+" })) as any;
    const url = resultUrl ? resultUrl : imagePath
    // save the cloud stored object access url to annotated KV
    await imageStore.set(req.params.id, url)
    // remove the local copy of the image from /tmp/
    fs.rmSync(req.file.path);
    res.status(201).send(`Uploaded image to ${generateImagePath(req.params.id)}`)
  } catch (err) {
    res.status(500).send({
      err: err,
      msg: "Error Happened"
    })
  }
});

router.delete('/v1/images/:id', async (req, res) => {
  // This isn't supported in cloud deployments yet. Will work locally though
  let exists = await imageStore.has(req.params.id);
  console.log(`Image exists: ${exists}`)
  if (exists) {
    let path = (await imageStore.get(req.params.id)) as string;
    await cloudEnabledFS.rm(path)
    res.status(204).end()
  } else {
    res.status(404).send(`No image found for id: ${req.params.id}`)
  }
})

/* @klotho::expose {
 *  target = "public"
 *  id = "app"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`)
})

app.use(router)

exports.app = app
