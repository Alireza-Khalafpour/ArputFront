'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet"

const center = [29.5926, 52.5836 ]
const zoom = 11

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(() => map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>


    </p>

  )
}



export default function GoogleMap() {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (

        <div className="w-full h-96" >
            <MapContainer
                className="w-full h-96 border border-asliLight rounded-lg"
                center={center}
                zoom={zoom}
                ref={setMap}
            >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>
        </div>

    ),
    [],
  )

  return (
    <div className="w-full h-96">
      {map ?  <DisplayPosition map={map} /> : null}
      {displayMap}
      
    </div>
  )
}
