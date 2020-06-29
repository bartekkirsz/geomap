import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

// consts: [34.0522, -118.2437]
import LOS_ANGELES_CENTER from '../const/la_center';
import fotowoltaika from './icons/fotowoltaika.svg';
import biofuel from './icons/biofuel.svg';
import pompa_ciepla from './icons/pompa_ciepla.svg';
import hydro_power from './icons/hydro-power.svg';
import solar_energy from './icons/solar-energy.svg';
import wind_power from './icons/wind-power.svg'
import geotermia from './icons/geotermia.svg'

import {connect} from "react-redux";
import {addEnergySources} from "../redux/actions";

let googleMap, googleMaps;

let markers = [];
let infowindows = [];

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places) => {

    googleMap = map;
    googleMaps = maps;

    console.log(places.length);

    const getSourceTypeIcon = (place) => {
        switch (place.source_type) {
            case 'biomasa':
                return biofuel;
            case 'fotowoltaika':
                return fotowoltaika;
            case 'kolektory_sloneczne':
                return solar_energy;
            case 'turbina_wiatrowa':
                return wind_power;
            case 'pompa_ciepla':
                return pompa_ciepla;
            case 'geotermia':
                return geotermia;
            case 'elektrownia_wodna':
                return hydro_power;
            default:
                return '';
        }
    };
    console.log(places)
    // if(places.length > 0) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
            places.forEach((place) => {
        console.log(place);
        markers.push(new maps.Marker({
            map,
            position: {
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lng),
            },
            icon: {
                url: getSourceTypeIcon(place),
                scaledSize: new maps.Size(50, 50),
                origin: new maps.Point(0, 0),
                anchor: new maps.Point(0, 0)
            }
        }));
        infowindows.push(new maps.InfoWindow({
            content: sourceInfo(place),
        }));
        markers.forEach((marker, i) => {
            marker.addListener('click', () => {
                infowindows[i].open(map, marker);
            });
        });
    });
    // }



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
      <div>
        <img src=${place.user_picture || 'https://m.wm.pl/2019/12/orig/fotowoltaika-597737.jpg'}  style="float: left; width: 100px; height: 100px" alt="Profile"/>
      </div>
      <div>
        <img src=${place.photo || 'https://m.wm.pl/2019/12/orig/fotowoltaika-597737.jpg'} style="float: right; width: 100px; height: 100px" alt="Photo"/>
     </div>
      <div style="float:left; text-align: left">
        <div style="font-size: 16px;">
            <b>Nazwa</b>: ${place.name}
        </div>
        <div style="font-size: 16px;">
            <b>Typ Źródła Energii</b> ${place.source_type}
        </div>
        <div style="font-size: 16px;">
            <b>Cena</b>: ${place.price}
        </div>
        <div style="font-size: 16px;">
            <b>Moc</b>: ${place.power}
        </div>
        <div style="font-size: 16px;">
            <b>Model</b>: ${place.model}
        </div>
        <div style="font-size: 16px;">
            <b>Data montażu</b>: ${place.assembly_data}
        </div>
        <div style="font-size: 16px;">
            <b>Lokalizacja</b> ${place.location}
        </div>
        <div style="font-size: 16px;">
            <b>Producent</b> ${place.manufacturer}
        </div>
        <div style="font-size: 16px">
            <b>Opis</b> ${place.description}
        </div>
        <button>Wyslij email</button>
        <div style="float: right; font-size: 16px">
            <b>Telefon:</b> ${place.user_phone}
        </div>
      </div>
    </div>`;

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            energy_sources: this.props.energy_sources || [],
        };
    }

    componentDidMount() {
        fetch('/energy_sources')
            .then(response => response.json())
            .then((data) => {
                this.setState({energy_sources: data});
                this.props.addEnergySources(this.state.energy_sources);
            });
    }

    render() {
        let energy_sources = this.props.energy_sources;

        if (googleMap && googleMaps) {
            // handleApiLoaded(googleMap, googleMaps, [this.props.energy_sources[this.props.energy_sources.length - 1]]);
            handleApiLoaded(googleMap, googleMaps, this.props.energy_sources);

        }
        return (
            // Important! Always set the container height explicitly
            // <div style={{'z-index': 2, height: '80vh', width: '140vh', position: 'relative', float: 'right'}}>
                <div style={{height: '80vh', width: '65vw', position: 'relative', float: 'right'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{key: 'AIzaSyDYUxRGQlsfZZ688F2p4Fq0rkU3Q4yLD78'}}
                        defaultCenter={LOS_ANGELES_CENTER}
                        defaultZoom={16}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps, energy_sources)}
                    >
                    </GoogleMapReact>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return state.energy_sources;
}

export default connect(mapStateToProps, {addEnergySources})(Map);