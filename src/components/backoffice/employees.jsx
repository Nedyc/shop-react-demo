import React, {useState, useEffect} from 'react';
import shop from "../../classes/shop";
import {Employee} from './employee';

export const Employees = (props) =>{
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        let employee_list = shop.getEmployees();
        if(employee_list)
            setEmployees(employee_list);
    });

    //Render employees
    const renderEmployees = () =>{
        if(!employees.length)
            return <div>No one is online at the moment...</div>;
        return null;
    }

    return(
        <React.Fragment>
            <header className="p-3 text-white bg-primary">
                Latest Online
            </header>
            <div className="py-3 text-left">
                {renderEmployees()}
                {
                    employees.map(function(employee, i){
                        let className = "p-2";
                        if(i%2 === 0)
                            className+=" bg-light";
                        return <Employee key={i} name={employee} className={className} />
                    })
                }
            </div>
        </React.Fragment>
    )
}