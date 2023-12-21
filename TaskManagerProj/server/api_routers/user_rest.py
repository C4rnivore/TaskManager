# from fastapi import APIRouter, Depends, Request, Response, status
# from requests import Session
# from ..main import get_db
# from .. import schemas, models, crud
# from ..main import send_notification


# router = APIRouter()

# @router.post('/users/create')
# async def create_user(user: schemas.UserCreate, response:Response, db:Session=Depends(get_db)):
#     response = Response()
#     response.headers.append('Access-Control-Allow-Origin', '*')
#     response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
#     response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

#     try:
#         user = crud.create_user(db=db, user=user)
#         response.status_code = status.HTTP_200_OK
#         await send_notification(f'User created')
#     except:
#         response.status_code = status.HTTP_404_NOT_FOUND

#     return response