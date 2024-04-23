from http.client import HTTPException

from fastapi import FastAPI, Depends, Request, Response
from starlette.middleware.sessions import SessionMiddleware
import secrets
from controller.auth import auth_router, authenticate_user
from controller.stock_controller import stock_router
from fastapi.middleware.cors import CORSMiddleware
from controller.profile_controller import profile_router

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=secrets.token_hex(16))
app.include_router(auth_router)
app.include_router(stock_router, prefix='/stock', dependencies=[Depends(authenticate_user)])
app.include_router(profile_router, prefix='/profile', dependencies=[Depends(authenticate_user)])

origins = [
    'http://localhost:5174'
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
