
import logging

from fastapi import FastAPI
from pydantic import BaseModel
from redis import cluster
from starlette.responses import PlainTextResponse

try:
  logging.info("Trying to connect to redis cluster")
  # @klotho::persist {
  #   id = "redis"
  # }
  client = cluster.RedisCluster(host='localhost', port=8001)
  logging.info("Connected to redis cluster")
except Exception as e:
  logging.error(e)
  raise(e)

# @klotho::expose {
#   id = "redis-gw"
#   target = "public"
# }
app = FastAPI()
@app.get("/users/{name}", response_class=PlainTextResponse)
async def get_user(name: str):
  logging.info(name)
  user = client.get(name)
  return user

class User(BaseModel):
  first_name: str
  last_name: str

@app.post("/users", response_class=PlainTextResponse)
async def add_users(user: User):
  logging.info(user)
  client.set(user.first_name, user.last_name)
  return "Success"


