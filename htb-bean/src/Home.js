import './App.css';
import campus from "./images/campus.jpg";


export default function Home({ goToFilter }) {
    return (
        <div className = "homeMainBody">
            <h1>Recycling for a greener Edinburgh</h1>
            <br/>
            <img src = {campus} alt = "University of Edinburgh Main Campus" className = "campus"/>
            <br/>
            <p>
                Find a Bin aims to improve sustainability on campus at UoE. We have realised that
                a good place to start with this would be to encourage both students and staff to recycle, and to aid their endeavors we created this
                web page to show everyone what local recycling facilities are available to them. This web page will show the closest recycling bins to their
                current location depending on what they intend to recycle.
            </p>
            {window.innerHeight <= 960 && (
              <button onClick={() => goToFilter()} className='mobileButton'>Find a Bin!</button>
            )}
        </div>
    )
}