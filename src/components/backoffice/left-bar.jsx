import React from 'react';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shop from "../../classes/shop";

export const LeftBar = (props) => {
    let history = useHistory();

    return(
        <React.Fragment>
            <div className="float-left">
                <div id="top-logo"></div>
            </div>
            <b className="float-left mt-2 ml-2">
                {shop.getName()}
            </b>
            <div className="clearfix"></div>

            <nav>
                <ul className="list-group mt-4">
                    {
                        Object.keys(props.menu).map(function(key, i){
                            let item = props.menu[key];
                            //Add selected classes if pathname is equal to menu url
                            let classes = "text-white text-decoration-none py-2 px-3 mb-1 d-block";
                            if(history.location.pathname === key)
                                classes+=" selected";
                            return (
                                <li key={key}>
                                    <Link className={classes} to={key}>
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span className="ml-2">{item.label}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </React.Fragment>
    )
}
