import './App.css';
import React, { useState, useEffect } from 'react';

import Home from './Home.js'
import Footer from './components/Footer';
import binLogo from "./images/binLogo.png";
import title from "./images/title.png";

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup
} from 'https://cdn.esm.sh/react-leaflet'

function App() {
  const [homePage, setHomePage] = useState(true);
  const [mapPage, setMapPage] = useState(false);
  const [filterPage, setFilterPage] = useState(false);

  const [coords, setCoords] = useState(null);
  const [map, setMap] = useState("https://www.openstreetmap.org/export/embed.html?bbox=-3.2060337066650395%2C55.93855329531538%2C-3.1777095794677734%2C55.94984861420047&amp;layer=mapnik");

  const getLocation = () => {
    try {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(navigatorHelper);
      } else {alert("Geolocation is not supported by this browser.");}
    }
    catch {
    }
  }

  const navigatorHelper = (position) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  const getSetMapLink = () => {
    const new_upper_latitude  = coords.latitude  + (1 / 6378) * (180 / Math.PI);
    const new_upper_longitude = coords.longitude + (1 / 6378) * (180 / Math.PI) / Math.cos(coords.latitude * Math.PI)/180;
    const new_lower_latitude = coords.latitude  - (1 / 6378) * (180 / Math.PI);
    const new_lower_longitude = coords.longitude - (1 / 6378) * (180 / Math.PI) / Math.cos(coords.longitude * Math.PI)/180;

    const link = 'https://www.openstreetmap.org/export/embed.html?bbox=' + new_lower_longitude +'%2C'+ new_lower_latitude + '%2C' + new_upper_longitude + '%2C' + new_upper_latitude+'&amp;layer=mapnik'

    setMap(link)
  }

  // const distanceBetweenPoints = (lat1, lat2) => {
  //   distance between 2 coords in miles =acos(sin(lat1)*sin(lat2)+cos(lat1)*cos(lat2)*cos(lon2-lon1))*6371
  // }

  // This runs on initialisation
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (coords) getSetMapLink();
  }, [coords]);

  const drawMap = (mapSrc) => {
    const cPosition = [55.9447956,-3.1875313]
    const cDestination = [55.944433, -3.187893]

    return(
      <div>
        render(
          <MapContainer center={cPosition} zoom={13} scrollWheelZoom={true}>
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
        )
      </div>
    );
  }

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
    setFilterPage(false);
    setMapPage(true);
  }

 
  const Checkbox = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox" checked={isChecked} />
          <span>{label}</span>
        </label>
      </div>
    );
  };
  //export default Checkbox;
  const Navbar = () => {
    return (
        <div>
            <nav className="navbar">

            <img src = {title} alt = "Find a Bin" />
            <img src = {binLogo} alt = "Web Logo" height = '60vh' width = 'height'/>

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
                      <li className="navbar_item">
                          <div onClick={goToMap} className="navbar_links">Go to Map</div>
                      </li>
                    </ul>
            </div>
            </nav>
        </div>
    )
  }

  const Filters = () => {
    return (
      <div className='filterMainBody'>
        <h2>Please select the campus you are closest to:</h2>

        <div className = "areaButtons">
          <input type="checkbox" id="areaButton" name="central" value="Central"/>
          <label for="central"> Central Campus</label>
          <input type="checkbox" id="areaButton" name="kings" value="Kings"/>
          <label for="kings"> Kings Campus</label>
        </div>
      

        <div>
          <h2>Please select which type of rubbish you want to dispose of:</h2>

          <div className = "rubbishButtons">
              <ul className="rubbish_menu">
                  <li className="rubbish_item">
                      <p className="rubbish_links">General Waste</p>
                  </li>
                  <li className="rubbish_item">
                      <p className="rubbish_links">Food Waste</p>
                  </li>
                  <li className="rubbish_item">
                      <p className="rubbish_links">Textile Recycling</p>
                  </li>
                  <li className="rubbish_item">
                      <p className="rubbish_links">Paper Recycling</p>
                  </li>
                  <li className="rubbish_item">
                      <p className="rubbish_links">Bottle Recycling</p>
                  </li>
                  <li className="rubbish_item">
                      <p className="rubbish_links">Packaging Recycling</p>
                  </li>
                  <li className="rubbish_item">
                      <p className="rubbish_links">Book Bank</p>
                  </li>
              </ul>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div>
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
            {drawMap(map)}
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
