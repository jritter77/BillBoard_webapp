import { Col, Row } from "../components/general/BasicComponents.js";
import { Calendar } from "../components/general/Calendar.js";
import { Dropdown } from "../components/general/Dropdown.js";
import { NavBar } from "../components/general/Navbar.js";
import { GetStartedButton } from "../components/home/GetStartedButton.js";
import { ImageCarousel } from "../components/home/ImageCarousel.js";
import { SiteHighlights } from "../components/home/SiteHighlights.js";
import { SiteSummary } from "../components/home/SiteSummary.js";
import { Bill } from "../server_requests/Bill.js";


async function Home() {

    const APP = $('#app');
    APP.html('');


    const siteSummary = new SiteSummary();
    const siteHighlights = new SiteHighlights();
    const imageCarousel = new ImageCarousel();
    const getStartedButton = new GetStartedButton();

    APP.append(
        Row().append(
            $('<div class="col-md"></div>').append(
                siteSummary.html,
                siteHighlights.html
            ),
            $('<div class="col-md"></div>').append(
                imageCarousel.html,
                getStartedButton.html
            )
        )
    );
}

export {Home}