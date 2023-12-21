import json
from fastapi import Depends, FastAPI, Response, Request, status, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
import database 
import crud, models, schemas

database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

FRONTEND_BASE_URL ='http://localhost:5173/'

# python -m uvicorn main:app --reload  

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Tasks endpoints
@app.get("/tasks/fetch/all")
def read_tasks(request:Request, db: Session = Depends(get_db)):
    return db.query(models.Task).all()

@app.post("/tasks/add/{user_id}")
def create_task(user_id:str, task: schemas.TaskCreate, response:Response, db: Session = Depends(get_db)):
    response = Response()
    response.headers.append('Access-Control-Allow-Origin', '*')
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    
    try:
        crud.create_user_task(db=db, task=task, user_id=user_id)
        response.status_code=status.HTTP_200_OK
    except:
        response.status_code=status.HTTP_404_NOT_FOUND
    return response

@app.delete("/tasks/delete/{task_id}")
def delete_task(task_id:str, response:Response, db: Session = Depends(get_db)):
    response = Response()
    response.headers.append('Access-Control-Allow-Origin', '*')
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    try:
        crud.delete_task_by_id(db=db, task_id=task_id)
        response.status_code = status.HTTP_200_OK
    except:
         response.status_code = status.HTTP_404_NOT_FOUND
    return response

@app.put("/tasks/update/{task_id}")
def update_task(task_id:str, task: schemas.TaskCreate, response:Response, db:Session = Depends(get_db)):
    response = Response()
    response.headers.append('Access-Control-Allow-Origin', '*')
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    try:
        crud.update_task_by_id(db, task_id, task)
        response.status_code = status.HTTP_200_OK
    except:
        response.status_code = status.HTTP_404_NOT_FOUND

    return response


# User endpoints
@app.post('/users/create')
def create_user(user: schemas.UserCreate, response:Response, db:Session=Depends(get_db)):
    response = Response()
    response.headers.append('Access-Control-Allow-Origin', '*')
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    response.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    try:
        user = crud.create_user(db=db, user=user)
        response.status_code = status.HTTP_200_OK
    except:
        response.status_code = status.HTTP_404_NOT_FOUND

    return response

@app.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")