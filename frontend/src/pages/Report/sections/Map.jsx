import React from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { Icon } from 'leaflet'
import locationIcon from '../../../assets/red-location.png'

function MapClickHandler({ setForm }) {
  useMapEvents({
    click(e) {
      setForm((prev) => ({
        ...prev,
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      }));
    },
  });

  return null;
}

const Map = ({ form, setForm }) => {
  const customIcon = new Icon({
    iconUrl: locationIcon,
    iconSize: [38, 38],
  })

  return (
    <div className="flex-1 flex pt-16 ">
      <div className="w-full relative">
        <MapContainer center={[28.6139, 77.2090]} zoom={13} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler setForm={setForm} />

          {form.latitude && form.longitude && (
            <Marker position={[form.latitude, form.longitude]} icon={customIcon}>
              <Popup>Complaint Location</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  )
}

export default Map
