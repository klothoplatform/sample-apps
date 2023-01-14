from fastapi import FastAPI

# @klotho::persist {
#   id = "hello"
#   secret = true
# }
import aiofiles as secrets
from starlette.responses import PlainTextResponse

helloPath = "/tmp/hello.txt"

# @klotho::expose {
#   id = "secrets-gw"
#   target = "public"
# }
app = FastAPI()


@app.get("/", response_class=PlainTextResponse)
async def get_secret():
    async with secrets.open('my_secret.key', mode='r') as f:
        contents = await f.read()
        return contents
