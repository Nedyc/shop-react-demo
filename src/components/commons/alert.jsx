import React, {useState, useEffect} from 'react';
import {Animated} from "react-animated-css";

export const Alert = (props) =>{
    const [alert, setAlert] =  useState({...props.alert});
    
    useEffect(() => {
        let props_alert = {...props.alert};
        //Show and set alert props
        if(props_alert.text){
            props_alert.isVisible = true;
            props_alert.classes = "alert alert-"+props_alert.type;
        }
        setAlert(props_alert);
        
        //After 2 seconds hide the alert
        setTimeout(function(){
            hideAlert();
        }, 2000);
    }, [props.alert]);

    //Hide alert func
    const hideAlert = () =>{
        setAlert({});
    }

    if(alert && alert.isVisible)
        return (
            <div className="container fixed-bottom">
                <div className="row">
                    <div className="col-12">
                        <Animated 
                            animationIn="flash" 
                        >
                            <div className={alert.classes} role="alert">
                                {alert.text}
                            </div>
                        </Animated>
                    </div>
                </div>
            </div>
        );
    
    return null;
}