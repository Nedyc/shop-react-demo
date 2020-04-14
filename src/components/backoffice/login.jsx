import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import auth from "../../classes/auth";
import shop from "../../classes/shop";
import user from "../../classes/user";

export const Login = (props) =>{
    const [animation, setAnimation] = useState("flipInX");
    const [isVisible, setIsVisible] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    let history = useHistory();

    //If user is logged redirect to dashboard
    if(user.username)
        history.push('/dashboard');

    //On form submit
    const onSubmitHandler = (event) =>{
        event.preventDefault();

        //If user is correct
        if(password === "Admin" && (username === "Admin" || shop.getEmployees().indexOf(username) >= 0)){
            auth.login(() => {
                //Add username to user class
                user.setUsername(username);
                //If remember me is checked save it on the localstorage
                if(rememberMe)
                    localStorage.setItem("user", username);
                history.push('/dashboard');
            });
        } else {
            //If username/password are wrong
            //Shake animation
            setIsVisible(false);
            setTimeout(function(){
                setAnimation("shake");
                setIsVisible(true);
            }, 1);
            
            //Show alert
            props.setAlert({
                text: "Wrong username or password", 
                type: "danger"
            });
        }
    }

    return (
        <div className="d-flex vh-100">
            <div className="w-100 justify-content-center align-self-center">
                <div className="container">
                    <Animated animationIn={animation} isVisible={isVisible}>
                        <div className="row">
                            <div className="rounded bg-light shadow col-12 col-sm-10 mx-auto">
                                <div className="row py-5 my-5">
                                    <div className="d-none d-md-block col-12 col-md-6 px-4 py-5" id="login-logo">
                                        
                                    </div>
                                    <form className="col-12 col-md-6 px-4 py-5 mx-auto" onSubmit={onSubmitHandler}>
                                        <h4 className="text-primary text-center mb-4">
                                            Member Login
                                        </h4>

                                        <label className="sr-only" htmlFor="username">
                                            *Username
                                        </label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                                id="username" 
                                                placeholder="*Username" 
                                                required 
                                            />
                                        </div>
                                        <label className="sr-only" htmlFor="password">
                                            *Password
                                        </label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <FontAwesomeIcon icon={faKey} />
                                                </div>
                                            </div>
                                            <input 
                                                type="password" 
                                                className="form-control" 
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                id="password" 
                                                placeholder="*Password" 
                                                required 
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <FontAwesomeIcon 
                                                icon={(rememberMe) ? faCheckSquare : faSquare} 
                                                onClick={()=>{
                                                    setRememberMe(!rememberMe)
                                                }}
                                                className="fa-2x mr-2 cursor-pointer float-left"
                                            />
                                            <span className="float-left mt-1">Remember me</span>
                                            <div className="clearfix"></div>
                                        </div>


                                        <button className="w-100 btn bg-primary rounded text-white">
                                            Login
                                        </button>

                                        <div className="mt-2 text-dark font-small">
                                            *Use any of the shop employees names from the api for the username, or 'Admin';<br />
                                            Password is always 'Admin'
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </div>
        </div>
    )
}