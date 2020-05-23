import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

// consts: [34.0522, -118.2437]
import LOS_ANGELES_CENTER from '../const/la_center';
import map_icon_flag_orange from './map_icon_flag_orange.svg'

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {

    console.log(map_icon_flag_orange);
    const markers = [];
    const infowindows = [];

    console.log(places)

    places.forEach((place) => {
        markers.push(new maps.Marker({
            map,
            position: {
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lng),
            },
            icon: map_icon_flag_orange
        }));

        infowindows.push(new maps.InfoWindow({
            content: sourceInfo(place),
        }));
    });


    markers.forEach((marker, i) => {
        marker.addListener('click', () => {
            infowindows[i].open(map, marker);
        });
    });
};

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${place.rating}
        </span>
        <span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span>
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${'$'.repeat(place.price_level)}
      </div>
      <div style="font-size: 14px; color: green;">
        ${place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div>
    </div>`;


const sourceInfo = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.source_type}
      </div>
      <div style="font-size: 16px;">
        ${place.location}
      </div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 16px;">
        ${place.manufacturer}
      </div>
      
    </div>`;


class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            places: [],
        };
    }

    componentDidMount() {
        fetch('/energy_sources')
            .then(response => response.json())
            .then((data) => {
                // data.forEach((result) => {
                //     result.show = false; // eslint-disable-line no-param-reassign
                // });
                // console.log(data)
                this.setState({places: data});
            });
    }

    render() {
        const {places} = this.state;
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '100vh', width: '130vh', position: 'absolute', right: '0px'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: 'AIzaSyDYUxRGQlsfZZ688F2p4Fq0rkU3Q4yLD78'}}
                    defaultCenter={LOS_ANGELES_CENTER}
                    defaultZoom={10}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps, places)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;