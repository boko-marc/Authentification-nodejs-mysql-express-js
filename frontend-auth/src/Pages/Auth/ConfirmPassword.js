import React from "react";
import { Link } from "react-router-dom";
function Confirm() {
  return 	<div class="box">
	
  <div class="inner-box">
  
  <h3>Email reset password has been sent !</h3>
  
  <p style={{textAlign:"center"}} >We send verification link on your providing email address please Check your email to change your password and login to your account.</p>
  <br />
  <p style={{textAlign:"center"}} >Go Back to <Link  to="/Login"><span class="link">Login Page </span></Link></p>
  </div>

</div> ;
}

export default Confirm;
