import Popup from 'reactjs-popup';
import './Header.css'
import { FC, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App/App';

const Header: FC<{}> = (props) => {
    const api = 'http://127.0.0.1:8000/'
    const [userName, setUsername] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const {user, setUser} = useContext(UserContext)

    const handleLogInSubmit = (e:any) => {
        axios({
            method: 'post',
            url: api + 'users/create',
            data: { username: userName, password:pass }
        })
        .then(function (response) {
            console.log(`Succesfully created new user`);
            localStorage.setItem('username', userName)
            window.location.reload()
        })
        .catch(function (error) {
            console.log(`Error occured when trying to create new task`);
            console.log(error);
        });
        e.preventDefault();
    }
    const handleUsernameChange = (e:any) =>{     
        setUsername(cur=> cur = e.target.value)
    }
    const handlePassChange = (e:any) =>{
        setPass(cur=> cur = e.target.value)
    }
    const logout =() =>{
        localStorage.removeItem('username')
        window.location.reload()
    }
    console.log(user);
    

    if(!localStorage.getItem('username')){
        return( 
            <header>
                <span>
                    Task Manager
                </span>
                <div className="buttons-container">
                <Popup trigger={<button className="header-btn login-btn ">Sign-up</button>} position={'bottom center'}>
                    <form method='POST' className='header-form' onSubmit={handleLogInSubmit}>
                        <label htmlFor="login-input">Enter username</label>
                        <input name='login-input' placeholder='Username' type="text" onChange={handleUsernameChange}/>
    
                        <label htmlFor="login-pass">Enter password</label>
                        <input name='login-pass' placeholder='Password' type="password" onChange={handlePassChange}/>
    
                        <button type='submit'>Sign-up</button>
                    </form>
                </Popup>
                    <button className="header-btn signup-btn">Login</button>
                </div>
            </header> 
        );
    }
    else{
        console.log(1);
        return(
            <header>
                <span>
                    Task Manager
                </span>
                <div className="username-container">
                    <span>{localStorage.getItem('username')}</span>
                    <button onClick={logout}>X</button>
                </div>
            </header> 
        )
       
    }
   
}

export default Header;