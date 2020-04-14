import React, {useState, useEffect} from 'react';
import {CounterBox} from './counter-box';

export const CountDown = () => {
    const [counter, setCounter] = useState({});

    let countDownDate = new Date("2023/01/01").getTime();

    //Get all the countdown pieces (days/minutes/...)
    const getTimeInfo = () =>{
        let now = new Date().getTime();
        let distance = countDownDate - now;

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setCounter({
            days: panNumber(days),
            hours: panNumber(hours),
            minutes: panNumber(minutes),
            seconds: panNumber(seconds)
        });

        if (distance < 0) {
            //It will never happen baby!
        }
    }

    const panNumber = (num) => {
        return (num < 9) ? "0"+num : num;
    }

    useEffect(() => {
        //Get time info each second
        const interval = setInterval(() => {
            getTimeInfo();
        }, 1000);

        //Clear interval
        return () => {
          clearInterval(interval);
        };
      });

    


    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center text-white mb-4">
                    <h1>Our online store will be open in...</h1>
                </div>
            </div>
            <div className="row">
                <CounterBox title="Days" value={counter.days} />
                <CounterBox title="Hours" value={counter.hours} />
                <CounterBox title="Minutes" value={counter.minutes} />
                <CounterBox title="Seconds" value={counter.seconds} />
            </div>
        </div>
    )
}