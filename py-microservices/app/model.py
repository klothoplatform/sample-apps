from aiocache import Cache
from datetime import datetime

# @klotho::persist {
#   id = "users_data"
# }
__users = Cache(Cache.MEMORY)


async def get_user(id: str):
    last_access_ts = await __users.get(id, default=False)
    if not last_access_ts:
        return None
    # aiocache turns last_access_ts into a decimal.Decimal, so convert it back to a float
    last_access_dt = datetime.fromtimestamp(float(last_access_ts))
    last_access_iso = last_access_dt.isoformat(timespec='seconds')
    return {
        "id": id,
        "last_accessed": last_access_iso
    }


async def post_user(id: str):
    await __users.set(id, datetime.utcnow().timestamp())
