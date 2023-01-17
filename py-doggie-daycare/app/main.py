from aiocache import Cache
from fastapi import FastAPI, Response
from pydantic import BaseModel


class PetRegistration(BaseModel):
    owner: str
    pet: str


# @klotho::persist {
#   id = "petsByOwner"
# }
petsByOwner = Cache(Cache.MEMORY)

# @klotho::expose {
#   id = "pet-api"
#   target = "public"
# }
app = FastAPI()


@app.post("/pets")
async def register_pet(registration: PetRegistration):
    """
    Associates a pet with its owner
    """
    owner = registration.owner
    pet = registration.pet

    # get the list of the owner's currently registered pets
    pets = await petsByOwner.get(owner, default=[])

    # adds the pet to the owners list of pets and stores the updated list
    pets.append(pet)
    await petsByOwner.set(owner, pets)

    return f"Added {pet} as {owner}'s pet"


@app.get("/owners/{owner}/pets")
async def get_owner_pets(owner: str, response: Response):
    """
    Gets all pets registered to the supplied   owner
    """
    pets = await petsByOwner.get(owner)
    if pets is None:
        response.status_code = 404
        return {"message": "Not Found"}
    else:
        return pets
