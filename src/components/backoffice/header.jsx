import React from 'react';
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import user from "../../classes/user";
import auth from "../../classes/auth";

export const Header = (props) =>{
    let history = useHistory();

    //Logout
    const logout = () =>{
        auth.logout(()=> {
            user.setUsername(null);
            localStorage.removeItem("user");
            history.push('/login');
        });
    }

    return (
        <header className="bg-light p-2 px-4">
            <div className="float-left d-block d-md-none">
                <div className="rounded py-2 px-3 bg-secondary text-white cursor-pointer" onClick={()=>{props.onMenuItemClick()}}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            </div>
            <div className="float-right">
                <div className="float-left mt-2">
                    <span className="mr-2">
                        {user.getUsername()}
                    </span>
                    (<span className="cursor-pointer text-primary" onClick={()=>{logout();}}>Logout</span>)
                </div>
                <div className="float-left">
                    <div className="rounded-circle bg-dark text-white px-3 py-2 ml-3">
                        <FontAwesomeIcon icon={faUser} />   
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
            
            <div className="clearfix"></div>
        </header>
    )
}