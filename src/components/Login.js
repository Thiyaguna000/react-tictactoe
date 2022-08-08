import React, { useState } from "react";
import { LoginUtil } from "./LoginUtli";
import { useNavigate } from 'react-router-dom';
import './Form.css';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [err,setErr] = useState("");
    const [load,setLoad] = useState(false);
    const history = useNavigate();

    const disableButton = !email || password.length < 6 || load;

    const handleLogin = async(e) =>{
        e.preventDefault();
        setErr(null);
        setLoad(true);
        try{
            await LoginUtil({email,password});
            history('/');
            setLoad(false);
        }
        catch(error){
            setErr(error.message);
            setLoad(false);
        }
    }

  return (
    <>
    <div className="wrapper">
      <div className="row container">
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email:</label>
            <div>
              <input type="text" className="textbox" value={email} onChange={(e) =>setEmail(e.target.value)}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor="password">Password:</label>
            <div>
              <input type="text" className="textbox" value={password} onChange={(e) =>setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="error">{err}</div>
          <button type="submit" disabled={disableButton} className="button">Login</button>
        </form>
      </div>
      </div>
    </>
  );
};

export default Login;
