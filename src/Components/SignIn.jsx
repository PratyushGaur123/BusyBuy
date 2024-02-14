import { useUserContext } from "../CustomUserContext";
import "../static/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignIn() {
    const {email, setEmail, password, setPassword, handleSignIn, user} = useUserContext();
    const navigation = useNavigate();

    useEffect(()=>{
        if(user){
            navigation("/");
        }
    })

    return  (
    <div className="big-div">
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form className="sign-in-form" onSubmit={handleSignIn}>
                <div className="sign-in-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required  value={email} onChange={(e)=> setEmail(e.target.value) } />
                </div>
                <div className="sign-in-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <div className="sign-in-group">
                    <button type="submit" >Sign In</button>
                </div>
            </form>
            <Link to="/signup"> or Sign-Up instead </Link>
        </div>
    </div>
    )
}

export default SignIn;