import React from 'react';
import { CountDown } from './count-down';

import {Header} from './header';
import {Footer} from './footer';

export const Home = (props) =>{
    return (
        <div className="d-flex vh-100" id="home">
            <div className="w-100 justify-content-center align-self-center">
                <Header storeName={props.storeName} />
                <CountDown />
                <Footer />
            </div>
        </div>
    )
}