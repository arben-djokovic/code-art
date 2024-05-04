import React, { useState } from 'react'
import './Login.scss'
import apiCalls from '../../api/apiCalls'
import { auth } from '../../services/AuthService'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {

    const history = useHistory();

    let [usernameInput, setUsernameInput] = useState("")
    let [passwordInput, setPasswordInput] = useState("")

    const login = async(e) => {
        e.preventDefault()
        if (usernameInput.length === 0 || passwordInput.length === 0) {
            toast.error('Please fill all input fields')
        }
        else {
            let userInfos = {
              username: String(usernameInput),
              password: String(passwordInput)
            }
            try {
                              const response = await apiCalls.post('/user/login', userInfos)
                            console.log(response)
                              auth.login(response.data.access, usernameInput)
                              history.push('/');
                            }
                            catch (error) {
                                console.log(error)
                            }
                        }
    }
  return (
    <div className='authPage'>
        <form className='authForm'>
            <div className="input">
                <p>Username</p>
                <input onChange={(e) => { setUsernameInput(e.target.value) }} type="text" name='username' />
            </div>
            <div className="input">
                <p>Password</p>
                <input onChange={(e) => { setPasswordInput(e.target.value) }} type="password" name='password' />
            </div>
            <button className='loginBtn' onClick={login}>Log in</button>
        </form>
    </div>
  )
}
