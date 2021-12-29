
import {Home} from "./views/home.js";
import {NavBar} from './components/Navbar.js';
import { Footer } from "./components/Footer.js";
import { About } from "./views/About.js";
import { Contact } from "./views/Contact.js";
import { Terms } from "./views/Terms.js";
import { Support } from "./views/Support.js";
import { Analysis } from "./views/Analysis.js";
import { Bills } from "./views/Bills.js";
import { Dashboard } from "./views/Dashboard.js";
import { Payments } from "./views/Payments.js";

$('#header').html(NavBar());
$('#footer').html(Footer());

const pages = {
    home: Home,
    about: About,
    contact: Contact,
    terms: Terms,
    support: Support,
    analysis: Analysis,
    bills: Bills,
    dashboard: Dashboard,
    payments: Payments
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