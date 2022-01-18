import { useEffect,useState,useRef } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './App.css';

function App() {
  const mapElement = useRef()
  const [map,setMap] = useState({});
  const [longitude,setLongitude] = useState(-0.112869);
  const [latitude,setLatitude] = useState(51.504);
  useEffect(()=>{
    let map = tt.map({
      key: "***",
      container: mapElement.current,
      center:[longitude,latitude], // change log and lat to get any city
       zoom:14,
      stylesVisibility:{
        trafficIncidents:true,
        trafficFlow:true
      },
     
    })
    setMap(map);
    const addMarker = ()=>{

      // pop up on our marker
      const popUpOffSet ={
        bottom:[0,-25]
      }
      const popup = new tt.Popup({
        offset:popUpOffSet
      }).setHTML("This is You!");

      // create a html div in which wekeep our parker
      const element = document.createElement('div')
      element.className = 'marker';

      // our marker 
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);
        // on marker drag set new longtitude and latitude 
        marker.on('dragend',()=>{
          const lagLat = marker.getLngLat();
          setLongitude(lagLat.lng);
          setLatitude(lagLat.lat);
        });
        //set popup on marker 
        marker.setPopup(popup).togglePopup()
    }
    addMarker() // call marker funtion here 

    return () => map.remove();
  },[longitude,latitude])
  return (
    <>
    {map && <div className="app">
      <div ref={mapElement} className="map"/>
      <div className="search">
        <h1>Where to...?</h1>
        <input 
        type = "text"
        id = "longitude"
        placeholder = "longitude"
        onChange = {(e)=>{setLongitude(e.target.value);}}
        />
        <input 
        type = "text"
        id = "latitude"
        placeholder = "latitude"
        onChange = {(e)=>{setLatitude(e.target.value);}}
        />

      </div>
    </div>}
    </>
  );
}

export default App;
