import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import { useState } from 'react';
import { useAuth } from '../hook/use.auth';
import { useNavigate } from 'react-router'
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState("")      
  const [password, setPassword] = useState("")
   const { handleLogin , loading } = useAuth()
     const navigate = useNavigate()
   if(loading){
    return <h1>Loading...</h1>
  }
     async function handlesubmit(e){
         e.preventDefault()

          handleLogin(username, password)
      .then((res) => {
        console.log(res)
         navigate("/")
        navigate("/")
      }).catch((err) => {
        console.log(err)
      })
}
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1> 

        <form onSubmit={handlesubmit}>
          <input
           onInput={(e) => { setUsername(e.target.value) }} 
            type="text"
            name="username"
            placeholder="Enter username"
          />

          <input
          onInput={(e) => { setPassword(e.target.value) }} 
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Login</button>
        </form>
        <p>Don't have a account?<Link className='toggleAuthForm' to="/register">Register</Link></p>
      </div>
    </main>
  )
}


export default Login
