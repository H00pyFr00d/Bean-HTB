import './App.css';
import React, { useState, useEffect } from 'react';

import Home from './Home.js'
import Footer from './components/Footer';
import binLogo from "./images/binLogo.png";



function App() {
  const [homePage, setHomePage] = useState(true)
  const [mapPage, setMapPage] = useState(false);

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
    return(
      <div>
        <iframe id="Map-Iframe" title="Map" src={mapSrc}/><br/>
      </div>
    );
  }

  const goToHome = () => {
    setHomePage(true);
    setMapPage(false);
  }

  const goToMap = () => {
    setHomePage(false);
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

            <h1>Bin Finder</h1>
            <img src = {binLogo} alt = "Web Logo" height = "100%" width = "height"/>

            <div className="navbar_container">
                <div className="navbar_toggle" id="mobile-menu">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                    <ul className="navbar_menu">
                      <li className="navbar_item">
                          <div onClick={goToHome} class="navbar_links">Home</div>
                      </li>
                      <li className="navbar_item">
                          <div onClick={goToMap} class="navbar_links">Find a Bin</div>
                      </li>
                    </ul>
            </div>
            </nav>
        </div>
    )
}

  return (
    <div>
      <header className="App-header">
        {Navbar()}
      </header>

      <checkBoxes className = "Check Boxes">
      {Checkbox("Central Campus") }
      </checkBoxes>
      
      <checkBoxes className = "Check Boxes">
      {Checkbox("Kings Buildings") }
      </checkBoxes>
      

      {homePage && (
        <div style={{'width': '100%', 'overflow': 'hidden'}}>
          <Home/>
        </div>
      )}

      {mapPage && (
        <div style={{'width': '100%', 'overflow': 'hidden'}}>

          <div style={{"width": "50%", 'height': '84.5vh', 'float': 'left'}}>
            {drawMap(map)}
          </div>

          <div style={{"marginLeft": "50%", 'margin': '2%'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis in neque eu blandit. Phasellus non dui ac ex pellentesque rhoncus. Pellentesque leo est, venenatis at odio a, pellentesque pharetra sapien. Morbi libero arcu, rhoncus vehicula eros et, elementum malesuada enim. Etiam mollis diam sed iaculis mollis. Proin ornare sem nec elementum vehicula. Phasellus vel scelerisque turpis, eu finibus odio. Cras sit amet nunc id sem maximus efficitur sit amet sit amet arcu. Proin in pharetra risus. Mauris vitae arcu vel urna dapibus pretium sit amet ac mauris.<br/>

            Fusce sit amet mauris tellus. Quisque lobortis mi non purus tristique, sit amet tempus odio semper. Aenean enim tellus, malesuada at lobortis eget, aliquam sit amet diam. Sed interdum consectetur turpis eu suscipit. Duis consequat, sapien eu luctus porta, ligula diam mattis tortor, varius dapibus dui justo eu mauris. Donec eget tempor justo, nec hendrerit ligula. Fusce id interdum magna.<br/>

            Morbi dapibus odio a velit ultrices, ut placerat elit consectetur. Nulla mattis urna ut mollis sodales. Aenean laoreet quis enim sed ornare. Vestibulum quis ante enim. Duis sagittis tincidunt augue, ut egestas metus. Pellentesque semper enim erat, in iaculis risus tristique in. Sed bibendum pretium velit, ut iaculis est pellentesque quis. Sed rhoncus lacus sed dui tristique, ac hendrerit leo vestibulum. Pellentesque bibendum rutrum sapien, eu tincidunt purus. Sed accumsan, orci non feugiat vestibulum, ante lacus semper augue, tincidunt viverra elit felis ut tellus. Suspendisse potenti. Fusce a nibh sit amet arcu imperdiet placerat nec id turpis. Maecenas a justo eget felis suscipit porttitor.<br/>

            Phasellus tempor turpis eu viverra rhoncus. Sed ornare ipsum non luctus ultricies. Ut a sem in ipsum cursus blandit. Praesent vestibulum malesuada vulputate. Curabitur imperdiet enim ex, id venenatis nibh posuere non. Nulla condimentum viverra malesuada. Vivamus ac nisi scelerisque, consequat ante id, hendrerit quam. Suspendisse mi libero, bibendum malesuada vestibulum at, imperdiet ut lectus. Nulla facilisi. Curabitur blandit lorem in risus elementum eleifend. Mauris in massa mi. Donec magna justo, eleifend efficitur tempor ac, congue ut mi. Quisque fringilla leo a lectus aliquet, in eleifend orci sodales. Sed vulputate sem nec arcu pharetra, vitae tristique urna porta.<br/>

            Nunc interdum lacus nec urna suscipit sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ultricies sit amet nibh eget gravida. Sed non sapien id mauris laoreet placerat elementum eget felis. Integer vel luctus neque. Vestibulum sed nulla ut est ultrices egestas non sed magna. Maecenas a varius dui. Nullam consectetur, erat ut maximus finibus, diam leo fermentum elit, quis aliquam metus leo id quam. Fusce vitae elit convallis, rhoncus nisi nec, semper nisi.<br/>
            <button onClick={getLocation()}>Reset Coordinates</button>
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
