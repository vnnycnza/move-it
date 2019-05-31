
/*global google*/
import React from 'react';
import { Button } from 'semantic-ui-react';
import { compose, withProps, withHandlers, withState } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withState('placeName', 'updateSelectedPlaceName', ''),
  withState('selectedPlace', 'updateSelectedPlace', null),
  withHandlers(() => {
    return {
      onToggleOpen: ({ updateSelectedPlace, updateSelectedPlaceName }) => (location) => {
        if (location) {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({
            'location': {
              lat: location.latitude,
              lng: location.longitude
            }}, (results, status) => {
            if (status === 'OK') {
              updateSelectedPlace(location.id);
              if (results[0]) {
                updateSelectedPlaceName(results[0].formatted_address);
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        } else {
          updateSelectedPlace(0);
          updateSelectedPlaceName('');
        }
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.latCenter, lng: props.lngCenter }}
      onTilesLoaded={props.fetchPlaces}
      onBoundsChanged={props.fetchPlaces}
    >
    <Marker
      key={'primary'}
      position={{ lat: props.latCenter, lng: props.lngCenter }}
      icon={{
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }}
    ></Marker>
    {props.markers.map((loc) =>
        <Marker
          key={loc.id}
          position={{ lat: loc.latitude, lng: loc.longitude }}
          onClick={() => props.onToggleOpen(loc)}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }}
        >
          {props.selectedPlace === loc.id && <InfoBox
            key={loc.id}
            onCloseClick={() => props.onToggleOpen(0)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <Button size='tiny'>{props.placeName}</Button>
          </InfoBox>}
        </Marker>
    )}
      
    </GoogleMap>
  )
});

export default class MyMap extends React.Component {
  render() {
      return (
          <MyMapComponent 
            latCenter={this.props.latCenter}
            lngCenter={this.props.lngCenter}
            markers={this.props.markers}
          />
      )
  }
}