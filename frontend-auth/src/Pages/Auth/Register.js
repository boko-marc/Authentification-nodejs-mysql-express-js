import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from 'react';
import axios from "../../axios/axios";

function Register() {
    const navigate = useNavigate();
    const [company,setcompany] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setconfirmPassword] = useState();
    const [email,setEmail] = useState()
    const [error,setError] = useState()
    function verifemail (str) {
        const filter =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        if (!filter.test(str)) {
          return false
        }
      }
    const handleSubmit= (e) => {
        if(password !== confirmPassword) {
            setError("Bad Confirmations password")
        }
        else if(password.length < 8)
        {
            setError("Password must contain 8 characters")
        }
        else if(verifemail(email) === false) {
            setError("Please email incorrect.")
        }
        else {
            const postData = {
                company:company,
                email:email,
                password:password
            }
            axios.post('auth/register',postData,{
                headers:{
                    'Content-Type': 'application/json'
                },
             
            }).then((response) => {
                if(response.data.succes === false)
                {
                    setError(response.data.message)
                }
                else 
                {   
                    navigate('/Login')
                }
            }).catch(error => console.log(error))
        }
    
        e.preventDefault();
      }
  return <div className="box">
	
  <div className="inner-box">
 
  <form onSubmit={e => { handleSubmit(e) }} >
  <h2>Welcome SignUp Today</h2>
  <div>
      {error ? <div className="alert alert-success" role="alert">
      {error}
</div> : null }
  </div>
  <input type="text" name="company" value={company} onChange={e=> setcompany(e.target.value)} placeholder="Name of company" autoComplete="on" required/>
  <input type="email" name="email" value={email} onChange={e=> setEmail(e.target.value)} placeholder="Your Email" autoComplete="on" required/>
  <input type="password" value={password} onChange={e=> setPassword(e.target.value)} name="password" minLenght={8}  placeholder="Password" required/>
  <input type="password" value={confirmPassword} onChange={e=> setconfirmPassword(e.target.value)} name="conformpassword" placeholder="Confirm your Password"  required/>
  <input type="submit" value="SignUp" />
  
  <p style={{textAlign:"center"}} >
          <Link to="/Login">
          <span>Already Register  Sign In ? </span>
          </Link>
          
  </p>
  
  </form>
  
  </div>
  
</div>;
}

export default Register;