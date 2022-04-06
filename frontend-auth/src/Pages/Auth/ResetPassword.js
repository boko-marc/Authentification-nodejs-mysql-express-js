import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "../../axios/axios";

function ResetPassword() {
  const[email,setEmail] = useState()
  const [error,setError] = useState()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
  
    axios.post('auth/forgot-password',{
      email:email
    },{
      headers:{
        'Content-Type': 'application/json'
    }
    }).then(response => {
      if(response.data.succes === false)
      {
          setError(response.data.message)
      }
      else {
        navigate("/Confirm")
      }
    })
    e.preventDefault();
  }
  return <div class="box">
	
  <div class="inner-box">
   
  <form  onSubmit={e => { handleSubmit(e) }}>
  <div>
      {error ? <div class="alert alert-primary" role="alert">
      {error} </div> : null }
  </div>
  <h3>Enter Your Email Address to reset your password.</h3>
  
  <input type="email" name="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Your Email Address " autoComplete="on" required/>
  
  <input type="submit" value="Send Recovery Link" />
  
  </form>
  
  </div>

</div>
}

export default ResetPassword;
