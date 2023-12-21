import { useEffect, useState } from 'react';
import './TasksComponent.css'
import Task from './Task/Task';
import axios from 'axios';
import AddTaskButton from './AddTaskButton/AddTaskButton';

function TasksComponent() {
    const [tasks, setTasks] = useState<Array<any>>([])

    const api = 'http://127.0.0.1:8000/'

    useEffect(()=>{
        axios({
            method:'GET',
            headers:{
              "Content-Type": "application/json"
            },
            url: api + 'tasks/fetch/all',
            responseType: 'json'
          })
          .then(response => {
            setTasks(response.data)
          }).
          catch(err=>{
            console.log('err');
          })
    },[])


    return ( 
        <section id='TasksComponent'>
            <div className="tasks-container">
                {tasks.map((task,index)=>(
                    <Task key={index} title={task.title} description={task.description} taskId={task.id}/>
                ))}
            </div>
            <AddTaskButton toggle={false}/>
        </section>
     );
}

export default TasksComponent;