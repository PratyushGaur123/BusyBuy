import React, { useEffect } from 'react';
import '../static/SignUp.css';  // Import your external stylesheet
import { useUserContext } from "../CustomUserContext";
import { useNavigate } from 'react-router-dom';



function SignUp() {
    const {email, setEmail, password, setPassword, name, setName, handleSignUp, user} = useUserContext();
    const navigation = useNavigate();

    useEffect(()=>{
        if(user){
            navigation("/");
        }
    })
    

    return (
        
        <div className="big-div">
            <div className="sign-up-container">
                <h2>Sign Up</h2>
                <form className="sign-up-form"  onSubmit={handleSignUp}>
                    <div className="sign-up-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required  value={name} onChange={(e)=> setName(e.target.value) } />
                    </div>
                    <div className="sign-up-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required  value={email} onChange={(e)=> setEmail(e.target.value) }/>
                    </div>
                    <div className="sign-up-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required  value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div className="sign-up-group">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
