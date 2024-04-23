from datetime import timedelta, datetime

from fastapi import APIRouter, Depends, Request, Response, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials, OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from starlette import status
from pydantic import BaseModel

auth_router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY = 'e4wC8jxzQ2Ub7$9P8Zh&VKN3Qs'
ALGORITHM = 'HS256'

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer_auth = OAuth2PasswordBearer(tokenUrl='auth/token')
security = HTTPBasic()


class CreateUserRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# todo Реализвать работу с БД. Необходимые функции: сохранение, получение usera
VALID_USERS = {
    'admin': 'password123',
    'user1': 'pass1234'
}


@auth_router.post('/login')
async def login(request: Request, credentials: HTTPBasicCredentials = Depends(security)):
    user = is_user_exists(credentials.username, credentials.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect username or password')
    token = create_access_token(credentials.username, timedelta(minutes=60))
    request.session['token'] = token
    return Response(content="Logged in!", status_code=status.HTTP_200_OK)


def create_access_token(username: str, expires_delata: timedelta):
    encode = {'username': username}
    expires = datetime.now() + expires_delata
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


def is_user_exists(username, password):
    if username in VALID_USERS and bcrypt_context.verify(password, VALID_USERS[username]):
        return True
    return False


def is_user_exists_by_username(username):
    return username in VALID_USERS


@auth_router.post('/register', status_code=status.HTTP_201_CREATED)
async def register(data: CreateUserRequest):
    if data.username in VALID_USERS:
        return Response('Username already exists', status_code=409)
    VALID_USERS[data.username] = bcrypt_context.hash(data.password)
    print(VALID_USERS)
    return Response('Register Successful', status_code=200)


async def authenticate_user(request: Request):
    print(request.session)
    print(request.session.get('token'))
    if 'token' not in request.session:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect credentials. No token in session')
    token = request.session.get('token')
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('username')
        if username is None or not is_user_exists_by_username(username):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect username or password')
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect credentials')
