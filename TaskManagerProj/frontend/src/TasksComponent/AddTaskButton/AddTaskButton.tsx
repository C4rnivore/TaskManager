import './AddTaskButton.css'
import { FC, useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

const api = 'http://127.0.0.1:8000/'


const AddTaskButton: FC<{callbackFunc:Function}> = (props) =>{ 
    const [title,setTitle] = useState<string>('')
    const [descr,setDescr] = useState<string>('')
    const [popupOpen, setPopupOpen] = useState<boolean>(false)


    const handleFormSubmit = (e:any) => {
        axios({
            method: 'post',
            url: api + 'tasks/add/' + 123,
            data: { title: title, description:descr }
        })
        .then(function () {
            console.log(`Succesfully created new task`);
            props.callbackFunc()
        })
        .catch(function (error) {
            console.log(`Error occured when trying to create new task`);
            console.log(error);
        });
        e.preventDefault();
    }

    const handleTitleChange = (e:any) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e:any) => {
        setDescr(e.target.value)
    }

    return (
        <div className="button-add">
            <Popup open={popupOpen} trigger={
                <button id='add-task-btn' onClick={()=>setPopupOpen(true)}>
                    +
                </button> 
                } position="left bottom">
                <div className="popup-form">

                    <form method='POST' onSubmit={handleFormSubmit}>
                        <span>Task title</span>
                        <input type="text" placeholder='Enter task title' onChange={handleTitleChange}/>
                        <div className="form-text-area">
                            <label>Task description:</label>
                            <textarea
                            rows={5} 
                            cols={33} 
                            placeholder='Enter task secription'
                            onChange={handleDescriptionChange}/>
                        </div>
                        <button className='create-task-btn' type='submit' onClick={()=>setPopupOpen(false)}>Create task</button>
                    </form>
                    
                </div>
            </Popup>
        </div>
    );
}

export default AddTaskButton