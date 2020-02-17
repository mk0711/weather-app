import React from 'react';
import Form from './Form';
import CurrentWeather from './CurrentWeather';
import SavedLocations from './SavedLocations';
import Error from './Error';

import './App.css';

var API_KEY = "73429fce9c65554be443038ee330a070";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherName: "",
            savedLocations: []
        };
    }


    componentDidMount = () => {
        var queriesJson = JSON.parse(localStorage.getItem("queryy"));
        if (queriesJson && queriesJson.length) {
            this.setState({weatherName: queriesJson[0], savedLocations: queriesJson});
            this.makeApiRequest(queriesJson[0]);
        }
    }

    render = () => {
        return (
            <div>
                <div id="header">
                    <h1>My React Application</h1>
                </div>
                <Form
                    placeholderText="Seattle, 98115"
                    onSubmit={(query) => {
                        this.makeApiRequest(query);
                    }}
                />

                {this.state.weatherName  ? (
                    <CurrentWeather
                        weatherName={this.state.weatherName}
                        weatherTemp={this.state.weatherTemp}
                        weatherDesc={this.state.weatherDesc}
                        weatherIcon={this.state.weatherIcon}
                        weatherState={this.state.weatherState}
                        weatherPressure={this.state.weatherPressure}
                        weatherHumidity={this.state.weatherHumidity}
                        weatherMinTemp={this.state.weatherMinTemp}
                        weatherMaxTemp={this.state.weatherMaxTemp}

                        onSave={() => {
                            this.saveQuery(this.state.weatherName);
                        }}
                    />
                ) : (
                    <Error weatherError={this.state.weatherError}
                    />
                )}

                {this.state.savedLocations.length > 0 && (
                    <SavedLocations
                        savedLocations={this.state.savedLocations}
                        onLocationClicked={(location) => {
                            this.makeApiRequest(location);
                        }}
                        onLocationRemoved={(location) => {
                            this.removeQuery(location);
                        }}
                    />
                )}
            </div>
        );

    }

    removeQuery = (query) => {
        var filteredList = this.state.savedLocations.filter( (savedLocation) => {
            return query !== savedLocation;
        });
        this.setState({
            savedLocations: filteredList
        });
        var queriesJson = JSON.stringify(filteredList);
        localStorage.setItem("queryy", queriesJson);
    }

    saveQuery = (query) => {
        if (!this.state.savedLocations.includes(query)) {
            var newSavedLocations = this.state.savedLocations.concat([ query ]);

            this.setState({
                savedLocations: newSavedLocations
            }, () => {
                var queriesJson = JSON.stringify(newSavedLocations);
                localStorage.setItem("queryy", queriesJson);
            });
        }
    }

    makeApiRequest = (query, temperature) => {
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + API_KEY + "&units=imperial";

        var fetchPromise = fetch(url);
        fetchPromise.then((response) => {
            response.json().then((data) => {
                if (response.status === 200) {
                    this.setState({
                        weatherName: data.name,
                        weatherTemp: parseInt(data.main.temp, 10) + "°",
                        weatherDesc: data.weather[0].main + " " + data.weather[0].description,
                        weatherIcon: data.weather[0].icon,
                        weatherState: data.sys.country,
                        weatherPressure: data.main.pressure,
                        weatherHumidity: data.main.humidity,
                        weatherMinTemp: parseInt(data.main.temp_min, 10),
                        weatherMaxTemp: parseInt(data.main.temp_max, 10)
                    });
                } else {
                    this.setState({
                        weatherName: null,
                        weatherError: data.message
                    });
                }
            });
        });
    }
}

export default App;
