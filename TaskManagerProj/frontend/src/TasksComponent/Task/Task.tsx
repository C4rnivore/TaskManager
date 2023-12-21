import { FC, useState } from 'react';
import './Task.css'
import axios from 'axios';
import Popup from 'reactjs-popup';

const Task:FC<{title:string, description:string, taskId:number, callbackFunc:Function}> = (props) =>{

    const api = 'http://127.0.0.1:8000/'
    const [title, setTitle] = useState<string>('')
    const [descr, setDescr] = useState<string>('')
    const [popupOpen, setPopupOpen] = useState<boolean>(false)

    function deleteTask(id:any){
        axios({
            method: 'delete',
            url: api + 'tasks/delete/' + id,
        })
        .then(function (res) {
            console.log(`Succesfully delete task [ Task id = ${id} ]`);
            props.callbackFunc()
        })
        .catch(function (error) {
            console.log(`Error occured when trying to delete task [ Task id = ${id} ]`);
        });
    }

    const handleTitleChange = (e:any) => {
        setTitle(cur=> cur = e.target.value)
    }

    const handleDescriptionChange = (e:any) => {
        setDescr(cur => cur = e.target.value)
    }

    const handleFormSubmit = (e:any) =>{
        axios({
            method: 'put',
            url: api + 'tasks/update/' + props.taskId,
            data: { title: title, description: descr }
        })
        .then(function (response) {
            console.log(`Succesfully updated task`);
            props.callbackFunc()
        })
        .catch(function (error) {
            console.log(`Error occured when trying to updated task`);
            console.log(error);
        });
        
        e.preventDefault();
    }

    return ( 
        <div className="task-card">
            <div className="task-header">
                <span className='task-title'>{props.title}</span>
            </div>
            <p className="task-description">
                {props.description}
            </p>
            <span className='task-id'> task id = {props.taskId} </span>
            <div className="task-buttons-container">
                <Popup trigger={
                                <button className="delete-task-btn">
                                    Edit
                                </button>} position="right top">
                    <div className="popup-form">
                        <form method='PUT' onSubmit={handleFormSubmit}>
                            <span>New task title</span>
                            <input type="text" placeholder='Enter task title' onChange={handleTitleChange}/>
                            <div className="form-text-area">
                                <label>New task description:</label>
                                <textarea
                                rows={5} 
                                cols={33} 
                                placeholder='Enter task secription'
                                onChange={handleDescriptionChange}/>
                            </div>
                            <button className='create-task-btn' type='submit'>Update task</button>
                        </form>
                    </div>
                </Popup>
                <Popup trigger={<button className="delete-task-btn">
                    X
                </button>} position="right center">
                    <div className="deletion-popup">
                        <span>Delete Task ?</span>
                        <div className="popupbtns">
                            <button onClick={() => deleteTask(props.taskId)}>Yes</button>
                            <button >No</button>
                        </div>
                    </div>
                </Popup>
            </div>

        </div> 
    );
}

export default Task;