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
//function calcCrow(lat1, lon1, lat2, lon2)
//{
//  var R = 6371; // km
//  var dLat = toRad(lat2-lat1);
//  var dLon = toRad(lon2-lon1);
//  var lat1 = toRad(lat1);
//  var lat2 = toRad(lat2);
//
//  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
//  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//  var d = R * c;
//  return d;
//}
//
//function toRad(Value)
//{
//    return Value * Math.PI / 180;
//}

function App() {
  const [homePage, setHomePage] = useState(true);
  const [mapPage, setMapPage] = useState(false);
  const [filterPage, setFilterPage] = useState(false);
 // const[mobilePage, setMobilePage] = useState(false);

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

  // const getSetMapLink = () => {
  //   const new_upper_latitude  = coords.latitude  + (1 / 6378) * (180 / Math.PI);
  //   const new_upper_longitude = coords.longitude + (1 / 6378) * (180 / Math.PI) / Math.cos(coords.latitude * Math.PI)/180;
  //   const new_lower_latitude = coords.latitude  - (1 / 6378) * (180 / Math.PI);
  //   const new_lower_longitude = coords.longitude - (1 / 6378) * (180 / Math.PI) / Math.cos(coords.longitude * Math.PI)/180;

  //   const link = 'https://www.openstreetmap.org/export/embed.html?bbox=' + new_lower_longitude +'%2C'+ new_lower_latitude + '%2C' + new_upper_longitude + '%2C' + new_upper_latitude+'&amp;layer=mapnik'

  //   setMap(link)
  // }

  const distanceBetweenPoints = (pos1, pos2) => {
     const latDif = pos1[0] - pos2[0]
     const lonDif = pos1[1] - pos2[1]
     const squareDis = Math.pow(lonDif,2) + Math.pow(latDif,2)
     console.log(squareDis);
     return squareDis
  }

  const updateDest = (newPos) => {
     setDestCoords({
       latitude: newPos[0],
       longitude: newPos[1]
     });
   }


  const searchJSON = () => {
    var cPosition = [coords.latitude, coords.longitude];
    
    // console.log("Current position")
    // console.log(cPosition)

    const dir = './datasets/' + favorite + '/'+favorite;
    const fileJSON = require(dir+'_'+typeRub+'.json')
    var closest = 0;
    var newPos = [fileJSON[0].LAT,fileJSON[0].LON];
    var closeDis = distanceBetweenPoints(cPosition,newPos);
    for (let i = 1; i < fileJSON.length; i++) {
        var newPos = [fileJSON[i].LAT,fileJSON[i].LON];
        console.log(i);
        var newDis = distanceBetweenPoints(cPosition,newPos);
        if (newDis < closeDis){
            closest = i;
            closeDis = newDis;
        }
    }
    
    updateDest([fileJSON[closest].LAT,fileJSON[closest].LON]);

    goToMap();
    //console.log(getDistanceFromLatLonInKm(cPosition[0], cPosition[1], fileJSON[closest].LAT, fileJSON[closest].LON));
  }

  useEffect(() => {
    if (coords.latitude != null && coords.longitude != null)
        console.log(coords)
  }, [coords]);

  useEffect(() => {
    getLocation()
  }, []);

//  componentDidMount() {
//  this.drawMap();
//  }

/////////////////////////////////////////////////////////////////////////////////////////////

const cPosition = [coords.latitude,coords.longitude];
const cDestination = [destCoords.latitude, destCoords.longitude];

const drawMap = () => {
  // console.log(distanceBetweenPoints(cPosition,cDestination));
  //    const query = new URLSearchParams({
  //      profile: 'foot',
  //      point: [cPosition,cDestination],
  //      key: '28add460-25f0-49ac-9f54-f332080d6b6b'
  //      }).toString();
  //      const resp = fetch(
  //      'https://graphhopper.com/api/1/route?${query}',
  //      {method: 'GET'}
  //    );
  //    try {
  //        const data = await resp.text();
  //        console.log(data);
  //    }
  //    catch(err) {
  //        alert(err);
  //    }


    return(
      <div>
        <MapContainer className="map" center={cPosition} zoom={30} scrollWheelZoom={true}>
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
              Nearest bin.
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
    return ( <p style={{'float': 'right', 'paddingTop': '0.5%', 'fontSize': '2vh', 'fontFamily': 'Verdana'}}> Data sourced from <a href = "https://data.edinburghcouncilmaps.info/datasets/ddb5fcb791634729b4b4d3d1e5b8aa05/explore"> Edinburgh City Council</a>, May 2021. </p>
    )
  }

  const Navbar = () => {

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const[menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
      if(!isMenuClicked) {
       setBurgerClass("burger-bar clicked")
       setMenuClass("menu visible")
      } else {
        setBurgerClass("burger-bar unclicked")
        setMenuClass("menu hidden")
      }
    }

    return (
        <div>
            <nav className="navbar">

            <img src = {title} style={{'marginLeft': '5%'}} onClick={goToHome} alt = "Find a Bin" height = "100%" width = "height" />
            <img src = {binLogo} alt = "Web Logo" height = "100%" width = "height"/>

            <div className="navbar_container">
            <div className="navbar_toggle" id="mobile-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
                    <ul className="navbar_menu">
                      <li className="navbar_item">
                          <div onClick={goToHome} className="navbar_links">Home</div>
                      </li>
                      <li className="navbar_item">
                          <div onClick={goToFilter} className="navbar_links">Find a Bin</div>
                      </li>
                    </ul>
            </div>
            </nav>
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
  const boxLog = () => {
    setTypeRub('box');
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
        <br></br>

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

         <br></br>
        
        
        <div className = "applyButton">
          <button onClick = {searchJSON}>Go to Map</button>
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
          <Home/>
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
