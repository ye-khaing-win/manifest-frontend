import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import './Map.scss';

const Map = ({ latitude = 0, longitude = 0 }) => {
  return (
    <MapContainer
      key={`[${latitude}, ${longitude}]`}
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
