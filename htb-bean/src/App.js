/* eslint-disable */ 

import './App.css';
import React, { useState, useEffect } from 'react';
import Home from './Home.js'
import binLogo from "./images/binLogo.png";
import title from "./images/title.png";
import generalWaste from "./images/GeneralWaste.jpg";
import bookWaste from "./images/bookRecycling.jpg";
import paperWaste from "./images/paperWaste.jpg";
import foodWaste from "./images/food-waste-only-signs.jpg";
import glassWaste from "./images/glassBottleWaste.jpg";
import packaging from "./images/packagingWaste.jpg";
import textileWaste from "./images/textileWaste.jpg";



import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

function App() {
  const [homePage, setHomePage] = useState(true);
  const [mapPage, setMapPage] = useState(false);
  const [filterPage, setFilterPage] = useState(false);

  const [coords, setCoords] = useState({latitude: null, longitude: null});
  const [destCoords, setDestCoords] = useState({latitude: null, longitude: null});

  const getLocation = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(navigatorHelper);
      } else {alert("Geolocation is not supported by this browser.");}
    }
    catch {}
  }

  getLocation();

   const navigatorHelper = (position) => {
     setCoords({
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     });
   }


  const distanceBetweenPoints = (pos1, pos2) => {
     const latDif = pos1[0] - pos2[0]
     const lonDif = pos1[1] - pos2[1]
     const squareDis = Math.pow(lonDif,2) + Math.pow(latDif,2)
     return squareDis
  }
  const calcCrow = (pos1, pos2) =>{
      const R = 6371;
      var dLat = toRad(pos2[0]-pos1[0]);
      var dLon = toRad(pos2[0]-pos1[0]);
      var lat1 = toRad(pos1[0]);
      var lat2 = toRad(pos2[0]);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(pos1[0]) * Math.cos(pos2[0]);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d;
    }

  const toRad = (Value) => {
        return Value * Math.PI / 180;
    }
  const updateDest = (newPos) => {
     setDestCoords({
       latitude: newPos[0],
       longitude: newPos[1]
     });
   }

  const searchJSON = () => {
    var cPosition = [coords.latitude, coords.longitude];


    const dir = './datasets/' + favorite + '/'+favorite;
    const fileJSON = require(dir+'_'+typeRub+'.json')
    var closest = 0;
    var newPos = [fileJSON[0].LAT,fileJSON[0].LON];
    var closeDis = distanceBetweenPoints(cPosition,newPos);
    for (let i = 1; i < fileJSON.length; i++) {
        var newPos = [fileJSON[i].LAT,fileJSON[i].LON];
        var newDis = distanceBetweenPoints(cPosition,newPos);
        if (newDis < closeDis){
            closest = i;
            closeDis = newDis;
        }
    }
    var closePos = [fileJSON[closest].LAT,fileJSON[closest].LON];
    var recentDis = Number((calcCrow(cPosition,closePos)*1000).toFixed(3));
    updateDest(closePos);

    goToMap();
  }

  useEffect(() => {
    if (coords.latitude != null && coords.longitude != null)
        console.log(coords)
  }, [coords]);

  useEffect(() => {
    getLocation()
  }, []);


const cPosition = [coords.latitude,coords.longitude];
const cDestination = [destCoords.latitude, destCoords.longitude];

const drawMap = () => {
  const typeConverter = {
    generalwaste: "General Waste",
    foodwaste: "Food Waste",
    textile: "Textile Recycling",
    paper: "Paper Waste",
    bottle: "Glass Recycling",
    packaging: "Packaging Waste",
    bookbank: "Book Bank"
  }


  return(
    <div>
      <MapContainer className="map" center={cDestination} zoom={35} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={cPosition}>
          <Popup>
            Current Location.
          </Popup>
        </Marker>
        <Marker position={cDestination}>
          <Popup>
            Nearest {typeConverter[typeRub]} Bin.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

  //-----------------------------------------
  const goToHome = () => {
    setHomePage(true);
    setMapPage(false);
    setFilterPage(false);
  }

  const goToFilter = () => {
    setHomePage(false);
    setMapPage(false);
    setFilterPage(true);
  }

  const goToMap = () => {
    setHomePage(false);
    setMapPage(true);
    setFilterPage(false);
  }


  const Footer = () => {
    return ( <p style={{'float': 'right', 'paddingTop': '0.5%', 'fontSize': '1.5vh', 'fontFamily': 'Verdana'}}> Data sourced from <a href = "https://data.edinburghcouncilmaps.info/datasets/ddb5fcb791634729b4b4d3d1e5b8aa05/explore"> Edinburgh City Council</a>, May 2021. </p>
    )
  }

  const Navbar = () => {
    return (
        <div>
            {window.innerWidth > 960 && (
            <nav className="navbar">

              <img src = {title} style={{'marginLeft': '5%'}} alt = "Find a Bin" height = "100%" width = "height" />
              <img src = {binLogo} alt = "Web Logo" height = "100%" width = "height"/>

              <div className="navbar_container">
                <div className="navbar_menu">
                  <ul>
                    <li className="navbar_item">
                        <div onClick={goToHome} className="navbar_links">Home</div>
                    </li>
                    <li className="navbar_item">
                        <div onClick={goToFilter} className="navbar_links">Find a Bin</div>
                    </li>
                  </ul>
                </div>
              </div>
              </nav>
            )}

            {window.innerWidth <= 960 && (
              <nav onClick={goToHome}  className="navbar">

              <img src = {title} style={{'marginLeft': '5%'}} alt = "Find a Bin" height = "100%" width = "height" />
            <img src = {binLogo} alt = "Web Logo" height = "100%" width = "height"/>

              <div className="navbar_container">
                <div className="navbar_menu">
                  <ul>
                    <li className="navbar_item">
                        <div onClick={goToHome} className="navbar_links">Home</div>
                    </li>
                    <li className="navbar_item">
                        <div onClick={goToFilter} className="navbar_links">Find a Bin</div>
                    </li>
                  </ul>
                </div>
              </div>
              </nav>
            )}
        </div>
      
        
    )
  }


  const [favorite, setFavorite] = React.useState('central');
  const [typeRub, setTypeRub] = React.useState('generalwaste')
  const handleCentralChange = () => {
    setFavorite('central');
  };

  const handleKingsChange = () => {
    setFavorite('kings');
  };

  const genLog = () => {
    setTypeRub('generalwaste');
  }
  const foodLog = () => {
    setTypeRub('foodwaste');
  }
  const texLog = () => {
    setTypeRub('textile');
  }
  const paperLog = () => {
    setTypeRub('paper');
  }
  const glassLog = () => {
    setTypeRub('bottle');
  }
  const packLog = () => {
    setTypeRub('packaging');
  }
  const bookLog = () => {
    setTypeRub('bookbank');
  }

  const Filters = () => {
    return (
      <div className='filterMainBody'>
        <h2>Please select the campus you are closest to:</h2>

        <br/>

        <div className = "areaButtons">
          <label className="container"><input type="radio" checked={favorite === 'central'} onChange={handleCentralChange} className="customradio"/> Central</label>
          <br></br>
          <label className="container"><input type="radio" checked={favorite === 'kings'} onChange={handleKingsChange} className="customradio" /> Kings</label>
        </div>
        <br/>
        <h2>Please select the rubbish you want to recycle:</h2>
        <br/>
        <div>
          <div className = "wastePics">
            <img src= {generalWaste} alt="General Waste logo" height = "150" width = "150"  />
            <img src= {foodWaste} alt="Food waste logo" height = "150" width = "150" />
            <img src= {textileWaste} alt="Textile Recycling logo" height = "150" width = "150" />
            <img src= {paperWaste} alt="Paper Waste logo" height = "150" width = "150" />
            <img src= {glassWaste} alt="Glass Waste logo" height = "150" width = "150" />
            <img src= {packaging} alt="Packaging Waste logo" height = "150" width = "150" />
            <img src= {bookWaste} alt="Book Waste logo" height = "150" width = "150" />
          </div>

          <div className = "wasteButtons">
            <button onClick = {genLog}>General Waste </button>
            <button onClick = {foodLog}>Food Waste </button>
            <button onClick = {texLog}>Textile Recycling </button>
            <button onClick = {paperLog}>Paper Waste </button>
            <button onClick = {glassLog}>Glass Recycling </button>
            <button onClick = {packLog}>Packaging Waste </button>
            <button onClick = {bookLog}>Book Bank </button>
          </div>

          <div className = "applyButton">
            <button onClick = {searchJSON}>Go to Map</button>
          </div>  
        </div>
      </div>
    )
  }

  return (
    <div id="map">
      <header className="App-header">
        {Navbar()}
      </header>

      {homePage && (
        <div style={{'width': '100%', 'overflow': 'hidden'}}>
          <Home goToFilter={goToFilter} />
        </div>
      )}
      
      {filterPage && (
        <div style={{'width': '100%', 'overflow': 'hidden'}}>
          <Filters/>
        </div>
      )}

      {mapPage && (
        <div style={{'width': '100%', 'overflow': 'hidden'}}>
          <div style={{"width": "100vw", 'height': '84.5vh', 'float': 'left'}}>
            {drawMap()}
          </div>
        </div>
      )}

      <footer className="App-footer">
        {Footer()}
      </footer>
    </div>
    
     );
  }


export default App;