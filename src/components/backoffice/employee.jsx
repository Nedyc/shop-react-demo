import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Employee = (props) => {
    return (
        <div className={props.className}>
            <div className="float-left">
                <div className="rounded-circle bg-primary text-white px-2 py-1 ml-3">
                    <FontAwesomeIcon icon={faUser} />   
                </div>
            </div>
            <div className="float-left ml-2 mt-1">
                {props.name}
            </div>
            <div className="clearfix"></div>
        </div>
    )
}