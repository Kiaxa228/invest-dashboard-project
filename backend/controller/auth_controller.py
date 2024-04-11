from fastapi import APIRouter, Depends, Request, Response
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from starlette import status

from model.model_dto import RegisterData

auth_router = APIRouter()

security = HTTPBasic()

# todo Реализвать работу с БД. Необходимые функции: сохранение, получение usera
VALID_USERS = {
    'admin': 'password123',
    'user1': 'pass1234'
}


@auth_router.post('/login')
async def login(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    username = credentials.username
    password = credentials.password
    if username in VALID_USERS and VALID_USERS[username] == password:
        request.session['user'] = username
        return Response('Successfully logged in', status_code=status.HTTP_200_OK)
    else:
        return Response('Incorrect username or password', status_code=401)


@auth_router.post('/register')
async def register(data: RegisterData):
    if data.username in VALID_USERS:
        return Response('Username already exists', status_code=409)
    VALID_USERS[data.username] = data.password
    return Response('Register Successful', status_code=200)
