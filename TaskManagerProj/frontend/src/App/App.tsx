import './App.css'
import Header from '../Header/Header'
import TasksComponent from '../TasksComponent/TasksComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dispatch, createContext, useState } from 'react';
import { ToastProvider, } from 'react-toast-notifications';

export interface User{
  username:string | null,
  password:string | null,
  id:string | null,
}
export const UserContext = createContext<{user:User|undefined, setUser:Dispatch<React.SetStateAction<User>>}>(null!);

function App() {
  const [user, setUser] = useState<User>(null!)

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
      <BrowserRouter>
          <UserContext.Provider value={{user, setUser}}>
            <Header/>
            <Routes>
                <Route path='/' element={
                  <TasksComponent/>
                }/>
            </Routes>
          </UserContext.Provider>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
