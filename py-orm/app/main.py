from fastapi import FastAPI
from user import addUsers, getUser

# @klotho::expose {
#   id = "app"
#   target = "public"
# }
app = FastAPI()

@app.get("/{name}")
async def get_user(name: str):
  user = getUser(name)
  return user

@app.put("/")
async def add_users():
  addUsers()
  return "Success"


