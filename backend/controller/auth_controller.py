from fastapi import APIRouter, Depends, Request, Response
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from starlette import status

from backend.model.model_dto import RegisterData
from backend.utils.crud_users import validate_user, create_user
from backend.main import session

auth_router = APIRouter()

security = HTTPBasic()

@auth_router.post('/login')
async def login(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    username = credentials.username
    password = credentials.password
    user = RegisterData(username, password)
    if validate_user(user, session):
        request.session['user'] = username
        return Response('Successfully logged in', status_code=status.HTTP_200_OK)
    else:
        return Response('Incorrect username or password', status_code=401)


@auth_router.post('/register')
async def register(data: RegisterData):
    user = create_user(data, session)
    if not user:
        return Response('Username already exists', status_code=409)
    return Response('Register Successful', status_code=200)
