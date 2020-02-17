import React from 'react';

class SavedLocations extends React.Component {
    render = () => {
        return (
            <div className ="container">
                <div className="row">
                    <div className="col-lg-12" id="weather-list">
                        <ul>
                            {this.props.savedLocations.map((location) => {
                                return (
                                    <li key={location}>
                                        <p>Saved Locations: </p>
                                        <a className="alignLeft" href="/#" onClick={(e) => {
                                            e.preventDefault();
                                            this.props.onLocationClicked(location);
                                        }}>
                                            {location}
                                        </a>
                                        <a className="alignRight" href="/#" onClick={(e) => {
                                            e.preventDefault();
                                            this.props.onLocationRemoved(location);
                                        }}> Remove</a>

                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default SavedLocations;
