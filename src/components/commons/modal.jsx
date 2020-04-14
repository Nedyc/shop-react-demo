import React, {useState, useEffect} from 'react';
import {Animated} from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const Modal = (props) =>{
    const [modal, setModal] =  useState({...props.modal});
    const [buttons, setButtons] =  useState(null);

    useEffect(() => {
        let props_modal = {...props.modal};
        //Show and set modal props
        if(props_modal.title)
            props_modal.isVisible = true;
        setModal(props_modal);

        //If the modal has buttons, render them
        if(props_modal && props_modal.buttons)
            setButtons(props_modal.buttons.map((button, key) =>
                <button 
                    key={key} 
                    className={"mt-4 mr-2 text-white btn bg-"+button.color}
                    onClick={()=>{
                        //Close default behavior
                        if(typeof button.callback === "string" && button.callback === "close")
                            onModalHide();
                        else{
                            button.callback(props);
                            onModalHide();
                        }
                    }}
                >
                    {button.label}
                </button>
            ));
    }, [props.modal]);

    //Hide modal func
    const onModalHide = () => {
        setModal({});
    }

    if(modal && modal.isVisible)
        return (
            <div className="black-bg-opacity d-flex h-100 fixed-top">
                <div className="container justify-content-center align-self-center">
                    <div className="row text-center">

                        <Animated animationIn="bounceInDown" className="bg-light col-xs-12 col-md-10 col-lg-8 mx-auto text-left">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 bg-secondary">
                                    <div className="d-flex h-100">
                                        <div className="container justify-content-center align-self-center">
                                            <div className="row text-center text-white py-5">
                                                <FontAwesomeIcon icon={modal.icon} className="fa-7x mx-auto" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-6 p-4">
                                    <header className="border-bottom pb-3 mb-4">
                                        <div className="float-left">
                                            {modal.title}
                                        </div>
                                        <div className="float-right">
                                            <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={()=>onModalHide()} />
                                        </div>
                                        <div className="clearfix"></div>
                                    </header>

                                    {modal.content}

                                    <div>
                                        {buttons}
                                    </div>
                                            
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </div>
        );
    
    return null;
}