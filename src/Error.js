import React from "react";

class Error extends React.Component {
    render = () => {
        return (
            <div>
                <h3 id="weather-error">{this.props.weatherError}</h3>
            </div>
        );
    }
}

export default Error;
