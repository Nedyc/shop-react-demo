import React, {useState, useEffect} from 'react';

export const Loader = (props) =>{
    const [loader, setLoader] =  useState({});

    useEffect(() => {
        //Show/hide loader
        setLoader({isShown: props.loader});
    }, [props.loader]);

    if(loader.isShown)
        return (
            <div className="black-bg-opacity d-flex h-100 fixed-top">
                <div className="container justify-content-center align-self-center">
                    <div className="row text-center text-white">
                        <div className="mx-auto">
                            <p>
                                Loading, please wait...
                            </p>
                            <div className="lds-dual-ring"></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    return null;
}