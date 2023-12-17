'use client'

import {MapComponent, MapTypes} from "@neshan-maps-platform/mapbox-gl-react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';
import { useState } from "react";
import NeshanMap from "react-neshan-map-leaflet";
import axios from "axios";


function CustomNeshanMap({setAddress}) {
    // const marker = new nmp_mapboxgl.Marker()

    const [newPlace , setNewPlace] = useState()

    // get address from location---------------------
    function GetAddress(e) {
      
        axios.get(`https://api.neshan.org/v5/reverse?lat=${e.lat}&lng=${e.lng}`, {
          headers: {"Api-Key": "service.596bd26a65694d79a0eabc1dd6e26ffd"}
          })
          .then((response) => {
            setAddress(response.data)
          })
          .catch((error) => {
            console.log(error, "Error");
          });
      }




    return (

        // <MapComponent 
        //     className="w-96 h-96 "
        //     options={{ 
        //         mapKey: "web.e967046fce064ab6b60df0bdce8f50ed" , 
        //         mapType: MapTypes.neshanRasterNight, 
        //         interactive:true, 
        //         poi: true,
        //         center: [51.389, 35.6892],
        //         zoom: 8,
        //         fadeDuration:"200",
                
        //     }}
            
        // >
        // </MapComponent>

        <div>
            <NeshanMap
                options={{
                    key: "web.e967046fce064ab6b60df0bdce8f50ed",
                    maptype: 'dreamy',
                    poi: true,
                    traffic: false,
                    center: [29.5926, 52.5836],
                    zoom: 12
                }}

                onInit={(L, myMap) => {
                    let marker = L.marker([29.5926, 52.5836])
                    .addTo(myMap)
                    .bindPopup(' این یک پیام از طرف آرپوت است ');

                    myMap.on('click', function (e) {
                    marker.setLatLng(e.latlng)
                    setNewPlace(e.latlng)
                    setTimeout(() => {
                        GetAddress(e.latlng)
                    }, 1000);
                    });

                    L.circle([35.699739, 51.348097], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                    
                    }).addTo(myMap);
                }}
                
            />
        </div>

        

    );
}

export default CustomNeshanMap;