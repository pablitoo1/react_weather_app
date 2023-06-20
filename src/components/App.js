import React, { Component } from 'react';
import Form from './Form';
import Result from './Result';
import './App.css';

//Klucz do API
const APIkey = '';

class App extends Component {

  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temperature: '',
    wind: '',
    pressure: '',
    error: false
  }

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleCitySubmit = (e) => {
    e.preventDefault(); //brak odświeżania strony

    const API =`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIkey}&units=metric`;

    //fetch tworzy obietnice, obietnica zwrócona jest nierozstrzygnięta. jest rozstrzygnięta gdy dostaniemy odpowiedź ====== then - spelnione, catch - odrzucone ||||| 404 jest rozstrzygane jako spelnione, bo dostalismy odpowiedz z serwera - czyli nawet jesli miasto nie istnieje
    fetch(API)
      .then(response => {
        if(response.ok){
          return response;
        }
        throw Error("Nie udało się");
      })        
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString();
        this.setState({
          error: false,
          date: time,
          city: this.state.value,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temperature: data.main.temp,
          wind: data.wind.speed,
          pressure: data.main.pressure,
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          city: this.state.value
        })
      }) 
  }

  render(){
    return (
      <div className="App">
        <Form 
        value={this.state.value} 
        change={this.handleInputChange}
        submit={this.handleCitySubmit}
        />
        <Result weather={this.state}/>
      </div>
    );
  }
}

export default App;
