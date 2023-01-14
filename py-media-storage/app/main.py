import os

# @klotho::persist {
#   id = "fs"
# }
import aiofiles as fs
from aiocache import Cache
from fastapi import FastAPI, Response, UploadFile
from starlette.responses import PlainTextResponse

# @klotho::persist {
#   id = "imageKV"
# }
imageStore = Cache(cache_class=Cache.MEMORY)

# @klotho::expose {
#   id = "media-gw"
#   target = "public"
# }
app = FastAPI()


@app.get("/v1/images/{id}", response_class=PlainTextResponse)
async def get_image(id: str, response: Response):
    path = await imageStore.get(id)
    if path:
        response.status_code = 200
    else:
        response.status_code = 404
    return path


@app.post("/v1/images/{id}", response_class=PlainTextResponse)
async def upload_image(id: str, image: UploadFile, response: Response):
    url = generate_image_path(id)
    try:
        content = await image.read()
        async with fs.open(url, mode="wb") as f:
            print(url)
            await f.write(content)
        await imageStore.set(id, url)
        # deletes the file from the local OS to avoid cluttering the system (won't impact cloud storage)
        os.remove(url)
        response.status_code = 200
    except Exception as e:
        response.status_code = 500
        return {"err": str(e), "msg": "Error Happened"}
    finally:
        await image.close()
    return "Uploaded image to {url}".format(url=url)


def generate_image_path(id: str):
    if os.environ.get("CLOUDCC", False) is True:
        return f"/tmp/${id}.png"
    else:
        return f"/images/${id}.png"
