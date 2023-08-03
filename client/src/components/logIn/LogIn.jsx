import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import './LogIn.css'

export const LogIn = () => {
	// const [uid,setUid]= useState('');
	const navigate = useNavigate();

	// const handleUid =(event)=>{
	// 	setUid(event.target.value);
	// }
	// const handleLogIn=()=>{
	// 	if(uid==2255){
	// 		navigate('/loggedIn');
	// 	}	
	// }

    return (
		<div>
			<div className="login-container">
				<div className="input-container">
					<label htmlFor="uid">Enter user ID</label>
					<input type="text" id="uid"  name="uid" />
                    <button onClick={()=>navigate('/loggedIn')} > Log in </button>
					<h6 className="error">Who the hell are you</h6>
				</div>
			</div>
		</div>
	);
};
