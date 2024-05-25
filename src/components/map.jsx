import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//   iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
// });

const MapComponent = ({ latitude, longitude, locationName, styles, height, width }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={10} style={{ zIndex:0, height: height ?? '300px', width: width ?? '100%' , ...styles}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          {locationName || 'Lokasi Anda'}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
