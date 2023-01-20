import './app.css';
import {useState} from "react";
import { useEffect } from 'react';

function App() {


    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [heat, setHeat] = useState("");
    let suggestion="";

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
    }, [city]);

    switch(weather){
        case("sunny"):
            if (parseInt(heat, 10)<15){
                suggestion = "Un gilet suffira.";
            }
            else{
                suggestion = "Le Tee-shirt sera votre ami aujourd'hui.";
            }
            break;
        case("cloudy"):
            suggestion = "Prévoyez une capuche au cas ou.";
            break;
        case("windy"):
            if (parseInt(heat, 10)<15){
                suggestion = "Un pull chaud sera nécessaire.";
            }
            else{
                suggestion = "Gardez un pull à proximité si vous êtes frileux.";
            }
            break;
        case("rainy"):
            if (parseInt(heat, 10)<15){
                suggestion = "Couvrez-vous bien !";
            }
            else{
                suggestion = "Prévoyez un parapluie ou une capuche.";
            }
            break;
        case("stormy"):
            if (parseInt(heat, 10)<15){
                suggestion = "Dans l'idéal évitez de sortir. Si vous devez quand-même quitter votre foyer, couvrez-vous bien.";
            }
            else{
                suggestion = "Prévoyez un parapluie, une capuche et des bottes.";
            }
            break;
        default:
            suggestion = "Pas de météo fournie."
            break;
    }
    return (
        <div className="App">

            <h1>{city} - FRANCE</h1>

            <p>{heat}°C</p>
            <p>{weather}</p>
            <hr></hr>
            <p>{suggestion}</p>
        </div>
    );
}

export default App;
