import './App.css'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {Navbar()}
      </header>
      
      <div style={{"width": "100%", 'height': '84.5vh'}}>
        <iframe className="Map-Iframe" title="Map" frameborder="0" scrolling="no" src="https://www.openstreetmap.org/export/embed.html?bbox=-3.2060337066650395%2C55.93855329531538%2C-3.1777095794677734%2C55.94984861420047&amp;layer=mapnik"></iframe><br/>
      </div>
      
      <footer className="App-footer">
        {Footer()}
      </footer>
    </div>
  );
} 

export default App;
