import React from 'react';
import { Polar } from 'react-chartjs-2';

export const Chart = (props) =>{
    return(
        <div>
            <h2 className="text-center text-primary">
                {props.title}
            </h2>
            <div className="bg-light rounded shadow p-4">
                <Polar data={props.data} />
            </div>
        </div>
    )
}