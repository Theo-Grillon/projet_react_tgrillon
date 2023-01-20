import './app.css';
import {useState} from "react";
import { useEffect } from 'react';

function App() {


    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [heat, setHeat] = useState("");

    useEffect(()=>{
        fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/geo?lon=12.aze&lat=31.e")
            .then((el) => el.json())
            .then((res) => setCity(res.city.toUpperCase()))
    }, []);
    console.log(city);
    useEffect(() =>{
        fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/weather/"+city)
            .then((el) => el.json())
            .then((res) => setWeather(res.condition))
    }, [city]);

    useEffect(()=>{
        fetch("https://izudztw6jk.execute-api.eu-west-1.amazonaws.com/Prod/weather/"+city)
            .then((el) =>el.json())
            .then((res) => setHeat(res.temperature))
    }, []);

    return (
        <div className="weather_api">
            
            <h1>{city} - FRANCE</h1>

            <p>{heat}°C</p>
            <p>{weather}</p>
        </div>
    );
}

export default App;
