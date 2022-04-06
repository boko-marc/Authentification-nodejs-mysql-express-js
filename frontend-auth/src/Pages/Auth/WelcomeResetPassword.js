import React from "react";
import { Link } from "react-router-dom";
function ConfirmResetPassword() {
  return 	<div class="box">
	
  <div class="inner-box">
  
  <h3>Welcome, password update succefuly</h3>
  
  <p style={{textAlign:"center"}} >You can Login with your new password </p>
  <br />
  <p style={{textAlign:"center"}} >Go Back to <Link  to="/Login"><span class="link">Login Page </span></Link></p>
  </div>

</div> ;
}

export default ConfirmResetPassword;
