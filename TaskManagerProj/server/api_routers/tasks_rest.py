# from fastapi import APIRouter, Depends, Request, Response, status
# from requests import Session
# from ..main import get_db
# from .. import schemas, models, crud
# from ..main import send_notification


# router = APIRouter()

# # Tasks endpoints
# @router.get("/tasks/fetch/all")
# def read_tasks(request:Request, db: Session = Depends(get_db)):
#     return db.query(models.Task).all()

# @router.post("/tasks/add/{user_id}")
# async def create_task(user_id:str, task: schemas.TaskCreate, response:Response, db: Session = Depends(get_db)):
#     response = Response()
#     response.headers.append('Access-Control-Allow-Origin', '*')
#     response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
#     response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    
#     try:
#         crud.create_user_task(db=db, task=task, user_id=user_id)
#         response.status_code=status.HTTP_200_OK
#         await send_notification(f'Created new task: {task.title}')
#     except:
#         response.status_code=status.HTTP_404_NOT_FOUND
#     return response

# @router.delete("/tasks/delete/{task_id}")
# async def delete_task(task_id:str, response:Response, db: Session = Depends(get_db)):
#     response = Response()
#     response.headers.append('Access-Control-Allow-Origin', '*')
#     response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
#     response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

#     try:
#         crud.delete_task_by_id(db=db, task_id=task_id)
#         response.status_code = status.HTTP_200_OK
#         await send_notification(f'Task deleted')
#     except:
#          response.status_code = status.HTTP_404_NOT_FOUND
#     return response

# @router.put("/tasks/update/{task_id}")
# async def update_task(task_id:str, task: schemas.TaskCreate, response:Response, db:Session = Depends(get_db)):
#     response = Response()
#     response.headers.append('Access-Control-Allow-Origin', '*')
#     response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
#     response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
#     try:
#         crud.update_task_by_id(db, task_id, task)
#         response.status_code = status.HTTP_200_OK
#         await send_notification(f'Task updated')
#     except:
#         response.status_code = status.HTTP_404_NOT_FOUND

#     return response