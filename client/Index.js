
import {Home} from "./views/Home.js";
import {NavBar} from './components/general/Navbar.js';
import { Footer } from "./components/general/Footer.js";
import { About } from "./views/About.js";
import { Contact } from "./views/Contact.js";
import { Terms } from "./views/Terms.js";
import { Support } from "./views/Support.js";
import { Analysis } from "./views/Analysis.js";
import { Bills } from "./views/Bills.js";
import { Dashboard } from "./views/Dashboard.js";
import { Payments } from "./views/Payments.js";
import { Register } from "./views/Register.js";




$('#header').html(NavBar.html);
$('#footer').html(Footer.html);

NavBar.init();
NavBar.setLinks();

Footer.setFooterPos();


const pages = {
    home: Home,
    about: About,
    contact: Contact,
    terms: Terms,
    support: Support,
    analysis: Analysis,
    bills: Bills,
    dashboard: Dashboard,
    payments: Payments,
    register: Register
}

function getPageFromURL() {
    const loc = location.hash.substring(1);
    return loc.split("-")[0];
    
}

// Populate contentDiv wtih retrieved HTML
async function loadContent() {
    let fragmentId = getPageFromURL();
    await pages[fragmentId]();
    window.onresize = Footer.setFooterPos;
    Footer.setFooterPos();
}

// Set to home page if no hash
if (!location.hash) {
    location.hash = '#home';
}

// initial call to load content
loadContent();

// add event listener for hash
window.addEventListener('hashchange', loadContent);
