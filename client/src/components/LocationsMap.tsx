import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import { BRANCHES } from '../data/branches'

// Vite bundles Leaflet's default marker icons at hashed URLs, which breaks the library's
// built-in relative-path lookup — point it at the bundled assets explicitly.
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export function LocationsMap() {
  return (
    <MapContainer
      center={[41.65, 21.4]}
      zoom={8}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {BRANCHES.map((branch) => (
        <Marker key={branch.id} position={[branch.lat, branch.lng]} icon={defaultIcon}>
          <Popup>
            <div className="text-xs">
              <p className="font-semibold text-slate-800">{branch.name}</p>
              <p className="text-slate-600">{branch.address}</p>
              <p className="mt-1 text-slate-600">📞 {branch.phone}</p>
              <p className="text-slate-600">✉️ {branch.email}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
