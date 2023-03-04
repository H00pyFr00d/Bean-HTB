import '../App.css'; 

export default function Navbar() {
    return (
        <div>
             <h1>Bin Finder</h1>
        <img src="binLogo.png" alt="web logo" width="80" height="80" />

        <div class = "navbar_container">
            <div class="navbar_toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <ul class="navbar_menu">
                <li class="navbar_item">
                    <a href="Home.html" class="navbar_links">Home</a>
                </li>
                <li class="navbar_item">
                    <a href="Filters.html" class="navbar_links">Find A Bin</a>
                </li>
            </ul>
        </div>
        </div>
    )
}
