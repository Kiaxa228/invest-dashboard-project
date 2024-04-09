from fastapi import APIRouter

profile_router = APIRouter()

#todo реализовать controller в соответствие со структурой в miro
#todo реализовать работу с БД profile
@profile_router.get('/get/{username}')
async def get_profile(username: str):
    return {'username': username}
