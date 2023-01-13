from app.model import get_user, post_user
from fastapi import FastAPI
from starlette.responses import PlainTextResponse

# @klotho::expose {
#   id = "microsrv-gw"
#   target = "public"
# }
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/users/{user_id}")
async def read_item(user_id: str):
    return await get_user(user_id)


@app.post("/users/{user_id}", response_class=PlainTextResponse)
async def write_user(user_id: str):
    await post_user(user_id)
    return f"Created {user_id}"
