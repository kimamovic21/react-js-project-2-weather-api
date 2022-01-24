import React, { useState, useEffect } from 'react';
import '../components/style.css'
import WeatherDetails from './WeatherDetails';

function SearchMain() {

  // useState hook
  const [searchTerm, setSearchTerm] = useState('sarajevo');
  const [tempInfo, setTempInfo] = useState({});
  // console.log(searchTerm);

  const getWeatherInfo = async () => {  // We have to add an async keyword
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=a237636b683ca065f849f9b5dc2fd4b9`;
      let res  = await fetch(url);
      let data = await res.json();
      const {temp, humidity, pressure} = data.main;
      const {main: weatherType} = data.weather[0]; //We changed main into weatherType
      const {name} = data;
      const {speed} = data.wind;
      const {country, sunset} = data.sys; 
      
      const myNewWeatherInfo = {
         temp, 
         humidity,
         pressure, 
         weatherType,
         name, 
         speed, 
         country, 
         sunset
      };

      setTempInfo(myNewWeatherInfo);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect hook
  //Promises
  //Async functions
  //Try and catch

  // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  useEffect(() => {
    getWeatherInfo();
  }, []); // dependencies array

  return (
     <>
        <div className='wrap'>

            <div className='search'>
              <input type='search'
                	   placeholder='Search city...'
                     id='search'
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className='searchButton' onClick={getWeatherInfo}> Search </button>

        </div>    {/* // className='wrap' */}

        {/* This is the weather details page */}
        <WeatherDetails {...tempInfo} />

        {/* spreads the value that is present inside an object */}
      </>
  );

}

export default SearchMain;


