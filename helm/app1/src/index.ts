/**
 * @klotho::execution_unit {
 *   id = "nginx-helm"
 * }
 */

import express = require('express')

const app = express()
const router = express.Router();
router.use(express.json())

/**
 * @klotho::persist {
 *   id = "users"
 * }
 */
 const users = new Map<string, string>();


 export async function getUsers(): Promise<string[]> {
   const keys = await users.keys()
   console.log("users:", keys)
   return [...keys]
 }
 
 export async function addUser(u: string) {
   await users.set(u, u)
   console.log("Added user", u)
 }
 

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
