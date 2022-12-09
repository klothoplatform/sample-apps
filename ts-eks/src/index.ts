import express = require('express')
import { addUser, getUsers } from './users';
import {set, getOrg} from './userInfo'

const app = express()
const router = express.Router();
router.use(express.json())

router.get('/users', async (req, res) => {
  try {
    const users = await getUsers()
    res.send(users);
  } catch (e) {
    console.log("error getting users", e)
    res.status(500).send(e)
  }
});

router.put('/users/:user', async (req, res) => {
  const user = req.params.user
  try {
    await addUser(user)
    res.status(201).send(`Created ${user}`)
  } catch (e) {
    console.log("error adding user", e)
    res.status(500).send(e)
  }
})

app.use(express.json());

app.post("/users/:user/info", async (req, res) => {
  try {
    const user = req.params["user"];
    const age = req.body["age"];
    const org = req.body["org"];
  
    await set(user, age, org);
    res.send("success"); 
  } catch (e) {
    console.log("error adding user info", e)
    res.status(500).send(e)
  }
});

app.get("/users/:user/info", async (req, res) => {
  const value = await getOrg(req.params["user"]);
  res.send(value);
});


app.use(router)

/* @klotho::expose {
 *  target = "public"
 *  id = "app"
 * }
 */
app.listen(3000, async () => {
  console.log(`App listening at :3000`)
})

export {app}
