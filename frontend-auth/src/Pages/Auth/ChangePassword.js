import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from 'react';
import axios from "../../axios/axios";
function ChangePassword() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [password,setPassword] = useState()
    const [confirmPassword,setconfirmPassword] = useState()
    const [error,setError] =useState()
    const change = {
        password:password,
        confirmPassword: confirmPassword
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password.length < 8)
        {
          return   setError("Password must contain 8 characters")
        }
        axios.put(`auth/reset-password/${id}`,change,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.data.succes === false)
            {
                setError(response.data.message)
            }
            else {
               navigate('/welcome') 
             
            }
        })
    }
  return <div class="box">

  <div class="inner-box">
 
      <form onSubmit={e => { handleSubmit(e) }} >
      
      <h2>Welcome!Choose your new paswword</h2>
      <div>
      {error ? <div className="alert alert-primary" role="alert">  {error} </div> : null }
     </div>
      <input type="password" name="" value={password} onChange={e=> setPassword(e.target.value)} placeholder="Your new password"  required/>
      <input type="password" value={confirmPassword} onChange={e=> setconfirmPassword(e.target.value)} placeholder="Confirm your new password" required/>
      <input type="submit" value="Change your password" />
      
      </form>
  
  </div>

</div>
}

export default ChangePassword;
