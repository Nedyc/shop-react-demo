import React, {useState, useEffect} from 'react';
import {Chart} from './chart';
import shop from "../../classes/shop";

export const Dashboard = (props) =>{
    const [firstCall, setFirstCall] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [chartLabels, setChartLabels] = useState(null);
    const [chartColors, setChartColor] = useState(null);

    const demoData = [{"category":"wands","numberOfProducts":1},{"category":"music","numberOfProducts":2},{"category":"hats","numberOfProducts":1},{"category":"t-shirts","numberOfProducts":1},{"category":"trousers","numberOfProducts":1},{"category":"clothes","numberOfProducts":4},{"category":"toys","numberOfProducts":1},{"category":"jacket","numberOfProducts":1},{"category":"birthday","numberOfProducts":1},{"category":"houseware","numberOfProducts":2},{"category":"a","numberOfProducts":1},{"category":"bath","numberOfProducts":1}];

    useEffect(()=>{
        if(!firstCall){
            setFirstCall(true);
            //Get stats from server
            props.api_call("stores/"+shop.getId()+"/stats/categories", "get").then((res)=>{
                if(res == null){
                    //Load demo data if api call failed
                    res = demoData;
            
                    //Show alert
                    props.setAlert({
                        text: "Demo data loaded...", 
                        type: "danger"
                    });
                }

                //Populate chart values
                let labelsArray = [];
                let dataArray = [];
                let colorsArray = [];
                for(let i=0; i<res.length; i++){
                    labelsArray.push(res[i].category);
                    dataArray.push(res[i].numberOfProducts);

                    //Set random color
                    let r = Math.floor(Math.random() * 255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);
                    colorsArray.push("rgb(" + r + "," + g + "," + b + ")");
                }
                setChartData(dataArray);
                setChartLabels(labelsArray);
                setChartColor(colorsArray);
            })
        }
    }, [firstCall, demoData, props]);

    const renderChart = () => {
        if(chartColors)
            return(
                <Chart title="Product Statistics" data={
                    {
                        datasets: [{
                            data: chartData,
                            backgroundColor: chartColors,
                            label: 'Products'
                        }],
                        labels: chartLabels
                    } 
                }/>
            )
        return null;
    }

    return(
        <React.Fragment>
            {renderChart()}
        </React.Fragment>
    )
}