import * as express from 'express';
import uuidAPI = require('uuid');
const uuid = uuidAPI.v4
const { router, app } = setupExpressApp();

const quotes = require('./quotes/quotes');
const userGet = require('./users/get-users');
const userPost = require('./users/post-users');

router.get('/', async (req, res) => {
  res.send("Hello from Klotho!");
});

function setupExpressApp() {
  const app: any = express();
  const router = express.Router();
  let cors = require('cors');
  router.use(cors());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  return { router, app };
}

/* @klotho::expose {
 *  target = "public"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`)
})

app.use(router)
app.use(quotes)
app.use(userGet)
app.use(userPost)

exports.app = app
