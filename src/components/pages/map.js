import React from 'react'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
render() {
    return (
  		<Map
          google={this.props.google}
          style={{width: '50%', height: '50%', position: 'relative'}}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={15}
        >
        	<Marker
		    title={'The marker`s title will appear as a tooltip.'}
		    name={'SOMA'}
		    position={{lat: 40.854885, lng:-89.081807}} />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAw-5lcQt4IDcurxf8qRfhbNkdm-4X5HHU'
})(MapContainer)