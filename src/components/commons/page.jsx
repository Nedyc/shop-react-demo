import React, { useState, useEffect } from 'react';
import {Alert} from '../commons/alert';
import {Modal} from '../commons/modal';
import apiDispatcher from "../../classes/api_dispatcher";
import {faSadCry} from '@fortawesome/free-solid-svg-icons';
import {Loader} from './loader';
import shop from "../../classes/shop";

export const Page = (props) => {
    const [modal, setModal] = useState({});
    const [alert, setAlert] = useState({});
    const [loader, setLoader] = useState(false);
    const [storeName, setStoreName] = useState("");

    /*Axios api call wrapper, automatically shows/hides the loader
    and render the modal if an error has encountered*/
    const api_call = async (endpoint, type, params) => {
        try{
            setLoader(true);
            const res = await apiDispatcher.call(endpoint, type, params);
            setLoader(false);
            return res;
        } catch(e){
            setLoader(false);
            setModal({
                title: "API CALL ERROR",
                content: "An error has eccured during the API call...",
                icon: faSadCry,
                buttons: [
                    {
                        label: "Ok then...",
                        color: "primary",
                        callback: "close"
                    }
                ]
            });

            return null;
        }
    }

    useEffect(() => {
        if(!shop.getName()){
            //Try to get the store info from localstorage
            let local_store = localStorage.getItem("store");
            //If exists load local storage values
            if(local_store){
                local_store = JSON.parse(local_store);
                setStoreData(local_store);
            } else {
                //Or else load them from server
                shop.setName(" ");
                //Get shop name if not defined
                api_call("stores/"+shop.getId(), "get").then((res) => {
                    if(res){
                        //Set shop data
                        setStoreData(res);

                        //Save on local storage
                        localStorage.setItem("store", JSON.stringify({
                            name: res.name,
                            category: res.category,
                            employees: res.employees
                        }));
                    }
                });
            }
        }
    });

    //Set the store data
    const setStoreData = (data) =>{
        shop.setName(data.name);
        shop.setCategory(data.category);
        shop.setEmployees(data.employees);

        document.title = data.name +" | Web App";
        setStoreName(data.name);
    }

    return (
        <React.Fragment>
            {React.cloneElement(props.children, { 
                setModal: setModal,
                setAlert: setAlert,
                setLoader: setLoader,
                api_call: api_call,
                storeName: storeName,
                shop: shop
            })}

            <Modal modal={modal} />
            <Alert alert={alert} />
            <Loader loader={loader} />
        </React.Fragment>
    );
}