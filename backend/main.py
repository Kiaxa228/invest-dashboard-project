from http.client import HTTPException

from fastapi import FastAPI, Depends, Request, Response
from starlette.middleware.sessions import SessionMiddleware
import secrets
from controller.auth_controller import auth_router
from controller.stock_controller import stock_router
from fastapi.middleware.cors import CORSMiddleware
from controller.profile_controller import profile_router

import sys, os


current_directory = os.path.dirname(__file__)
parent_directory = os.path.dirname(current_directory)
project_directory = os.path.dirname(parent_directory)

sys.path.append(project_directory)

from backend.model.db_session import global_init

global_init()
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=secrets.token_hex(16))
app.include_router(auth_router, prefix='/auth')
app.include_router(stock_router, prefix='/stock')



async def authenticate_user(request: Request):
    if 'user' not in request.session:
        raise HTTPException()


app.include_router(profile_router, prefix='/profile', dependencies=[Depends(authenticate_user)])

origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def main():
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8080)


if __name__ == '__main__':
    main()
