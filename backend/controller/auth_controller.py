from fastapi import APIRouter, Depends, Request, Response
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from starlette import status
import sys, os


current_directory = os.path.dirname(__file__)
parent_directory = os.path.dirname(current_directory)
project_directory = os.path.dirname(parent_directory)

sys.path.append(project_directory)

from backend.model.db_session import create_session
from backend.model.model_dto import RegisterData
from backend.utils.crud_users import validate_user, create_user

auth_router = APIRouter()

security = HTTPBasic()

@auth_router.post('/login')
async def login(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    session = create_session()
    username = credentials.username
    password = credentials.password
    user = RegisterData(username, password)
    if validate_user(user, session):
        request.session['user'] = username
        session.close()
        return Response('Successfully logged in', status_code=status.HTTP_200_OK)
    else:
        session.close()
        return Response('Incorrect username or password', status_code=401)


@auth_router.post('/register')
async def register(data: RegisterData):
    session = create_session()
    user = create_user(data, session)
    session.close()
    if not user:
        return Response('Username already exists', status_code=409)
    return Response('Register Successful', status_code=200)
