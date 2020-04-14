import React from 'react';
import { Route, Redirect } from  "react-router-dom";
import auth from "../../classes/auth";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={
            (props) => {
                //Check if the user is logged when access to a protected route
                if(auth.isAuthenticated())
                    return <Component {...props} />
                
                //If not then redirect to login page
                return <Redirect to={
                    {
                        pathname: "/login"
                    }
                } />
            }
        }/>
    )
}