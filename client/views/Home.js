import { Calendar } from "../components/general/Calendar.js";
import { Dropdown } from "../components/general/Dropdown.js";
import { NavBar } from "../components/general/Navbar.js";
import { Bill } from "../server_requests/Bill.js";


async function Home() {

    const APP = $('#app');
    APP.html('HOME');

    console.log(await Bill.verifyPaid(12));
}

export {Home}