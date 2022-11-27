import React, { useState } from 'react'
import './Login.css'
import { auth } from './Firebase'
import { useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const login = (e) => {
      // This will stop sign-in button to refresh our app
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, password)
      .then((auth)=>{
        if(auth){
          navigate('/')
        }
      })
      .catch((error)=>{
        alert(error.message)
      });
    }
    const register = (e) => {
      // This will stop register button to refresh our app
      console.log('you click register button')
      e.preventDefault();

      createUserWithEmailAndPassword(auth,email, password)
      .then((auth) => {
        if(auth)
          navigate('/')
      })
      .catch((error) => {
        alert(error.message)
      });
    }

  return (
    <div className="login">
        <img 
        className='login__logo'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png" alt="amazon logo" />
        <div className="login__container">
            <h1>Sign-in</h1>
            <form>
                <h5>Email : </h5>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <h5>Password : </h5>
                <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>

                <button
                type='submit'
                onClick={login}
                className='login__loginButton'>Sign-in</button>
            </form>
            <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
            <button
            onClick={register}
            className='login__registerButton'>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login