import * as express from 'express';
import * as cats from './pets/cats';
import * as dogs from './pets/dogs';

const { router, app } = setupExpressApp();

function setupExpressApp() {
  const app: any = express();
  const router = express.Router();
  let cors = require('cors');
  router.use(cors());
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
  return { router, app };
}

router.get('/', async (req, res) => {
  res.send("Hello from Klotho!");
});

app.use(router)
app.use(cats.router)
app.use(dogs.router)

/* @klotho::expose {
 *  id = "app"
 *  target = "public"
 * }
 */
  app.listen(3000, async () => {
    console.log(`App listening locally`)
  })

exports.app = app
