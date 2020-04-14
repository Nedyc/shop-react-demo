import React from 'react';

export const CounterBox = (props) => {
    return (
        <div className="col-3 text-center">
            <div className="text-center text-white">
                {props.title}
            </div>

            <div className="py-5 px-3 rounded text-white counter-box">
                {props.value}
            </div>

        </div>
    )
}