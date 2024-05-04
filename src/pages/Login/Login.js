import React from 'react'
import './Login.scss'

export default function Login() {
  return (
    <div className='authPage'>
        <form className='authForm'>
            <div className="input">
                <p>Username</p>
                <input type="text" name='username' />
            </div>
            <div className="input">
                <p>Password</p>
                <input type="password" name='password' />
            </div>
            <button className='loginBtn'>Log in</button>
        </form>
    </div>
  )
}
