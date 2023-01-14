from fastapi import FastAPI
import redis
from pydantic import BaseModel
from starlette.responses import PlainTextResponse

# @klotho::persist {
#   id = "redis"
# }
client = redis.Redis(host='localhost', port=6379, db=0)

# @klotho::expose {
#   id = "redis-gw"
#   target = "public"
# }
app = FastAPI()


@app.get("/users/{name}", response_class=PlainTextResponse)
async def get_user(name: str):
    user = client.get(name)
    return user


class User(BaseModel):
    first_name: str
    last_name: str


@app.post("/users",  response_class=PlainTextResponse)
async def add_users(user: User):
    client.set(user.first_name, user.last_name)
    return "Success"
