
import './App.css'
import Header from '../Header/Header'
import TasksComponent from '../TasksComponent/TasksComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dispatch, createContext, useEffect, useState } from 'react';

export interface User{
  username:string | null,
  password:string | null,
  id:string | null,
}
export const UserContext = createContext<{user:User|undefined, setUser:Dispatch<React.SetStateAction<User>>}>(null!);

function App() {
  const [user, setUser] = useState<User>(null!)

  return (
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
  )
}

export default App
