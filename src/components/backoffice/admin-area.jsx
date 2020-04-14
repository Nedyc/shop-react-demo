import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {LeftBar} from './left-bar';
import {Header} from './header';
import {Animated} from "react-animated-css";
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { Employees } from './employees';

export const AdminArea = (props) =>{
    const [leftBarShow, setLeftBarShow] = useState(false);
    let history = useHistory();

    //Show/hide mobile menu
    const onMenuItemClick = () =>{
        setLeftBarShow(!leftBarShow);
    }

    const menu = {
        "/dashboard": {
            label: "Dashboard",
            icon: faChartPie
        },
        "/products": {
            label: "Products",
            icon: faTag
        },
        "/":{
            label: "WebSite",
            icon: faHome
        }
    };

    //Get mobile left bar
    const getMobileLeftBar = () =>{
        if(leftBarShow)
            return(
                <div className="d-md-none fixed-top text-white black-bg-opacity">
                    <Animated animationIn="fadeInLeft">
                        <div className="row">
                                <div className=" col-10 bg-secondary p-4 vh-100">
                                    <LeftBar storeName={props.storeName} menu={menu} />
                                </div>
                                <div className="col-2 vh-100 p-0">
                                    <div className="bg-primary p-4 text-center" onClick={()=>{onMenuItemClick()}}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </div>
                                </div>
                        </div>
                    </Animated>
                </div>
            )
        return null;
    }

    return(
        <div className="row" id="admin-area">
            {getMobileLeftBar()}
            <div className="d-none d-md-block col-6 col-md-4 col-xl-2 bg-secondary text-white p-4 min-vh-100">
                <LeftBar storeName={props.storeName} menu={menu} />
            </div>
            <div className="col-12 col-md-8 col-xl-10">
                <Header onMenuItemClick={onMenuItemClick} />
                <div className="row">
                    <div className="col-12 col-xl-8">
                        <header className="px-4 py-2 bg-secondary text-white">
                            <h1 className="m-0">{menu[history.location.pathname].label}</h1>
                        </header>
                        <main className="p-4">
                        {
                            React.cloneElement(props.children, { 
                               api_call: props.api_call,
                               setAlert: props.setAlert,
                               setModal: props.setModal,
                            })
                        }
                        </main>
                    </div>
                    <div className="d-none d-xl-block col-4 text-center" id="emplyees">
                        <Employees />
                    </div>
                </div>
            </div>
        </div>
    )
}