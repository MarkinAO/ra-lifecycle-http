import { useState } from 'react';
import './Watches.css';
import Clock from './Clock';
import { ClockType } from "./models";

export default function Watches() {
    let [city, setCity] = useState('');
    let [timeZone, setTimeZone] = useState('');
    let [clocks, setClocks] = useState<ClockType[]>([{city: 'Местное время', timeZone: '', id: '1'}]);

    const onSubmitHandler = (city: string, timeZone: string):void => {
        event?.preventDefault();
        const id = String(city) + String(new Date);
        if(+timeZone < -99) timeZone = '-99';
        if(+timeZone > 99) timeZone = '99';
        const data = { city, timeZone, id };
        if(data.city.length === 0) return;
        setClocks(clocks = [...clocks, data]);
        setCity(city = '');
        setTimeZone(timeZone = '');
    }

    const deleteClock = () => {
        const clockId = event?.target?.getAttribute('data-id');
        const newClcocks = clocks.filter(el => el.id !== clockId);
        setClocks(clocks = [...newClcocks]);
    }

    return(
        <>
            <form className="watches-wrap" onSubmit={() => onSubmitHandler(city, timeZone)}>
                <div>
                    <p>Название</p>
                    <input className="watches-input" type="text" value={city} onChange={(event: any) => setCity(city = event.target.value)} />
                </div>
                <div>
                    <p>Временная зона</p>
                    <input className="watches-input" type="text" value={timeZone} onChange={(event: any) => setTimeZone(timeZone = event.target.value)} />
                </div>
                <button className="watches-button">Добавить</button>
            </form>
            <div className="watches-wrap">
                { clocks.map(clock => <Clock clock={clock} deleteClock={deleteClock} key={clock.id}/>) }
            </div>
        </>
    )
}