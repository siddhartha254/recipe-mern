import React, {useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [,setCookies] = useCookies(["access_token"])

    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,password
        });

        //console.log(response);
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        navigate("/");

        } catch(err){
            console.error(err);
        }
    }

    return(
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            label="Login"
            onSubmit={onSubmit}
        />
    )
}

const Register = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = async (event) =>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/auth/register", {
                username,password
        });
        alert("Registration Successful. You can login now.")
        }catch(err){
            console.error(err);
        }
    };

    return(
        <Form 
            username={username} 
            setUsername={setUsername} 
            password={password} 
            setPassword={setPassword} 
            label="Register"
            onSubmit={onSubmit}
        />
    )
}

const Form = ({username, setUsername, password, setPassword, label, onSubmit}) =>{
    return(
        <div className="auth-container">
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div className="form-group">
                    {/* <label htmlFor="username">Username: </label> */}
                    <input 
                        type="text" 
                        placeholder="Username"
                        id="username"
                        value ={username}
                        onChange= {(event)=>setUsername(event.target.value)}/>
                </div>
                <div className="form-group">
                    {/* <label htmlFor="password">Password: </label> */}
                    <input 
                        type="password"
                        placeholder="Password" 
                        id="password"
                        value = {password} 
                        onChange= {(event)=>setPassword(event.target.value)}/>
                </div>
                <button type="submit"> {label} </button>
            </form>
        </div>
    )
}

const Auth = () =>{
    return(
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
}

export default Auth;