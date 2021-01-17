import { Button } from '@material-ui/core';
import React from 'react';
import { auth } from './firebase';
import "./login.css";
import { provider } from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
       auth
       .signInWithPopup(provider)
       .then((result) => {
           dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
           });
       })
       .catch((error) => alert(error.message));
    }; 


    return (
        <div className="login">
            <div className="login-container">
                <img 
                  src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                  alt=""
                />

                <div className="login-text">
                    <h1>Sign In to WhatsApp</h1>
                </div>

                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>

            </div>
        </div>
    )
}

export default Login
