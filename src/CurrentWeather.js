import React from "react";

class CurrentWeather extends React.Component {
    render = () => {
        return (
            <div className ="container">
                <div className="row">
                    <div className="col-lg-6" id="weather-data">
                        <h2 id="weather-name">{this.props.weatherName}</h2>
                        <p id="weather-desc">{this.props.weatherDesc}</p>
                        <p id="weather-temp">{this.props.weatherTemp}</p>
                        <img src={"http://openweathermap.org/img/w/" + this.props.weatherIcon + ".png"} alt="weather-Icon"/>
                        <button
                            id="weather-save"
                            onClick={(e) => {
                                e.preventDefault();
                                this.props.onSave();
                            }}
                        >Save</button>
                    </div>
                    <div className="col-lg-6" id="weather-data">
                        <h2>{this.props.weatherName}, {this.props.weatherState}</h2>
                        <p>Pressure: {this.props.weatherPressure}hPa</p>
                        <p>Humidity: {this.props.weatherHumidity}%</p>
                        <p>Low: {this.props.weatherMinTemp}°</p>
                        <p>High: {this.props.weatherMaxTemp}°</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrentWeather;
