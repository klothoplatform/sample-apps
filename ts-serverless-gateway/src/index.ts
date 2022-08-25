import * as express from 'express';
const { router, app } = setupExpressApp();

import * as quotes from './quotes/quotes';
import * as userGet from './users/get-users';
import * as userPost from './users/post-users';

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
 *  id = "app"
 *  target = "public"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening locally`)
})

app.use(router)
app.use(quotes.router)
app.use(userGet.router)
app.use(userPost.router)

exports.app = app
