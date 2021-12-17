
import {Home} from "./views/home.js";
import {NavBar} from './components/Navbar.js';
import { Footer } from "./components/DesktopFooter.js";

$('#header').html(NavBar());
$('#footer').html(Footer());

const pages = {
    home: Home
}

function getPageFromURL() {
    const loc = location.hash.substring(1);
    return loc.split("-")[0];
    
}

// Populate contentDiv wtih retrieved HTML
function loadContent() {
    let fragmentId = getPageFromURL();
    pages[fragmentId]();
    $('.modal').modal('hide');
}

// Set to home page if no hash
if (!location.hash) {
    location.hash = '#home';
}

// initial call to load content
loadContent();

// add event listener for hash
window.addEventListener('hashchange', loadContent);