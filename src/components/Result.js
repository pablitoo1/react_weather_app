import React from 'react';
import './Result.css';

const Result = (props) => {

    const {date, city, sunrise,
         sunset,temperature, wind, 
         pressure, error} = props.weather;

    let content = null;

    if(!error && city){
        //mnożenie razy 1000 bo są milisekundy tam
        const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
        content = (
            <React.Fragment>
                <h3>Wyniki wyszukiwania dla <em>{city}</em></h3>
                <h4>Dane dla dnia i godziny: {date}</h4>
                <h4>Aktualna temperatura: {temperature} &#176;C</h4>
                <h4>Wschód słońca dzisiaj o {sunriseTime}</h4>
                <h4>Zachód słońca dzisiaj o {sunsetTime}</h4>
                <h4>Aktualna siła wiatru wynosi : {wind} m/s</h4>
                <h4>Aktualne ciśnienie wynosi : {pressure} hPa</h4>
            </React.Fragment>
        )
    }

    return ( 
        <div className='result'>
            {error ? `Nie mamy w bazie ${city}` : content}
        </div>
     );
}
 
export default Result;