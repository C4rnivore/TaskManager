import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import './TasksComponent.css'
import Task from './Task/Task';
import axios from 'axios';
import AddTaskButton from './AddTaskButton/AddTaskButton';

function TasksComponent() {
    const [tasks, setTasks] = useState<Array<any>>([])
    const [createdTasks, setCreatedTasks] = useState<Array<any>>([])
    const { addToast } = useToasts();
    const ws_api = 'ws://localhost:8000/ws'
    const api = 'http://127.0.0.1:8000/'
    let ws:WebSocket|null = null

    useEffect(()=>{
      ws = new WebSocket(ws_api)
      ws.onmessage = (e:any)=>{
        addToast(e.data, { appearance: 'info' });
      } 
    },[])

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
    },[createdTasks])

    function setCreatedTasksFunc(task:any){
      setCreatedTasks([...createdTasks, '1'])
    }

    function deleteCreatedTaskFunction(){
      setCreatedTasks([...createdTasks, '1'])
    }

    return ( 
        <section id='TasksComponent'>
            <div className="tasks-container">
                {tasks.map((task,index)=>(
                    <Task key={index} title={task.title} description={task.description} taskId={task.id} callbackFunc={deleteCreatedTaskFunction}/>
                ))}
            </div>
            <AddTaskButton callbackFunc={setCreatedTasksFunc}/>
        </section>
     );
}

export default TasksComponent;