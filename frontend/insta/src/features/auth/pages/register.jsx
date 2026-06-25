import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import  axios from 'axios'
     const register = () => {
     const [username, setUsername] = useState("")
     const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")


      
     async function handlesubmit(e){
         e.preventDefault()
  
}
     return (
     <main>
      <div className="form-container">
        <h1>Register</h1>
       
        <form onSubmit={handlesubmit}>
          <input
              onInput={(e) => { setUsername(e.target.value) }} 
              type="text"
             name="username"
             placeholder="Enter username"
           
          />
           <input
             onInput={(e) => { setEmail(e.target.value) }} 
             type="text"
             name="Email"
             placeholder="Enter Email"
           
          />

          <input
              onInput={(e) => { setPassword(e.target.value) }} 
              type="text"
              name="password"
             placeholder="Enter password"
          />

          <button type="submit">Register</button>
        </form>
         <p>Alredy have an account?<Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
     </main>
      )
       }

       export default register