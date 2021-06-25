import "./App.css";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, AttributionControl } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';
import Card from "./components/Card"
import CardForm from "./components/CardForm"
import Hero from "./components/Hero"
import axios from "axios";

function App() {
  const attributionStyle = {
    right: 0,
    top: 0
  };
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 24.774265,
    longitude: 46.738586,
    zoom: 4,
  });
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins")
        setPins(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPins();
  }, [])
  const handelMarkClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }
  const handelNewPlace = (e) => {
    console.log(e)
    const [long, lat] = e.lngLat
    setNewPlace({ lat: lat, long: long })
  }
  return (
    <div>
      {showMap ?
        <ReactMapGL
          {...viewport}
          onDblClick={handelNewPlace}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
          mapStyle="mapbox://styles/faisal-12/ckorpogvy2guc18p11huexnar"
          attributionControl={false}>

          <AttributionControl compact={true} style={attributionStyle} />
          {pins.map(pin => (
            <>
              <Marker key={pin._id} latitude={pin.lat} longitude={pin.long} offsetLeft={-20} offsetTop={-10}>
                <RoomIcon onClick={() => handelMarkClick(pin._id, pin.lat, pin.long)} style={{ fontSize: viewport.zoom * 8, color: "slateblue", cursor: "pointer" }} />
              </Marker>
              {pin._id === currentPlaceId &&
                <Popup
                  latitude={pin.lat}
                  longitude={pin.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="bottom" >
                  <Card pin={pin} />
                </Popup>
              }
            </>
          ))}
          {newPlace && <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="bottom" >
            <CardForm newPlace={newPlace} setPins={setPins} pins={pins} setNewPlace={setNewPlace} />
          </Popup>}
        </ReactMapGL> :
        <Hero setShowMap={setShowMap}/>
      }


    </div>
  );
}

export default App;

