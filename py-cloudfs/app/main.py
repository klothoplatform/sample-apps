from fastapi import FastAPI
from datetime import datetime
# @klotho::persist {
#   id = "fs"
# }
import aiofiles

helloPath = "/tmp/hello.txt"

# @klotho::expose {
#   id = "cloudfs-gw"
#   target = "public"
# }
app = FastAPI()


@app.get("/")
async def read_root():
    await setup()
    async with aiofiles.open(helloPath, mode='r') as f:
        result = await f.read()
        return result


async def setup():
    t = datetime.now()
    async with aiofiles.open(helloPath, mode='w') as f:
        await f.write("Startup at {}".format(t))
