import React from 'react';
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

export const Header = (props) =>{
    return (
        <header className="fixed-top py-2">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="float-left">
                            <div id="top-logo" className="float-left"></div>
                            <b className="float-left text-white ml-4 pt-4" id="text-logo">
                                {props.storeName}
                            </b>
                            <div className="clearfix"></div>
                        </div>
                        <div className="float-right text-white">
                            <FontAwesomeIcon icon={faFacebook} className="d-none d-sm-block mr-3 mt-2 float-left cursor-pointer" />
                            <FontAwesomeIcon icon={faTwitter} className="d-none d-sm-block mr-3 mt-2 float-left cursor-pointer" />
                            <FontAwesomeIcon icon={faInstagram} className="d-none d-sm-block mr-3 mt-2 float-left cursor-pointer" />
                            
                            <Link className="btn bg-secondary text-white float-left" to="/login">Login</Link>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}