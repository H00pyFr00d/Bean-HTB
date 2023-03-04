import '../App.css'; 
import binLogo from "../images/binLogo.png"

export default function Navbar() {
    return (
        <div>
            <nav class="navbar">

            <h1>Bin Finder</h1>
            <img src = {binLogo} alt = "Web Logo" height = "100%" width = "height"/>

            <div class = "navbar_container">
                <div class="navbar_toggle" id="mobile-menu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                    <ul class="navbar_menu">
                        <li class="navbar_item">
                            <a href="Home.js" class="navbar_links">Home</a>
                        </li>
                        <li class="navbar_item">
                            <a href="Filters.html" class="navbar_links">Find A Bin</a>
                        </li>
                    </ul>
            </div>
            </nav>
        </div>
    )
}
