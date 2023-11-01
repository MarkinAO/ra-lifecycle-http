import { ClockType } from "./models";
import { DateTime } from "luxon";
import { useEffect, useState } from 'react';

interface ClockProps {
    clock: ClockType
    deleteClock: Function
}

export default function Clock(props: ClockProps) {    
    const { city, timeZone, id } = props.clock;
    const { deleteClock } = props;
    let zoneToString = '';

    if(timeZone[0] === '-' || timeZone[0] === '+') {
        zoneToString = 'UTC' + timeZone;
    } else if(timeZone.length === 0) {
        zoneToString = 'system';
    } else {
        zoneToString = 'UTC+' + timeZone;
    }

    let [now, setNow] = useState(DateTime.fromObject({}, {zone: zoneToString}));
    
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setNow(now = DateTime.fromObject({}, {zone: zoneToString}))
        }, 1000);

        return () => clearInterval(timeOut);
    }, [now])

    return(
        <>
            <div>
                <div className="clock-title">{city}</div>
                <div className="clock">
                    <div className="clock-cross" onClick={() => deleteClock()} data-id={id}>X</div>
                    <div className="hour" style={{transform: `rotate(${now.hour * 30}deg)`}}></div>
                    <div className="minute" style={{transform: `rotate(${now.minute * 6}deg)`}}></div>
                    <div className="second" style={{transform: `rotate(${now.second * 6}deg)`}}></div>
                    <div className="dot"></div>
                </div>
            </div>            
        </>
    )
}