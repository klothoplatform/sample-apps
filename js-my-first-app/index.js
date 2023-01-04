const express = require('express');

const app = express();
app.use(express.json());

/* @klotho::persist {
 *   id = "petsByOwner"
 * }
 */
const petsByOwner = new Map();

async function addPetName(req, res) {
  const {pet, owner} = req.body;
  try {
    await petsByOwner.set(owner, pet);
    res.send(`Added ${pet} as ${owner}'s pet`);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


async function getAllPets(req, res) {
  try {
    res.json(Object.fromEntries(await petsByOwner.entries()));
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

app.get('/pets', getAllPets);
app.post('/pets', addPetName);

/*
 * @klotho::expose {
 *  id = "pet-api"
 *  target = "public"
 *  description = "Exposes the Pet API to the internet"
 * }
 */
app.listen(3000, () => console.log('App listening locally on: 3000'));
