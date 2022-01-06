import { DashNav } from "../components/dashboard/dashNav.js";
import { MonthSummary } from "../components/dashboard/MonthSummary.js";
import { NextDue } from "../components/dashboard/NextDue.js";
import { RecentPayments } from "../components/dashboard/RecentPayments.js";
import { Col, Row } from "../components/general/BasicComponents.js";
import { Login } from "../components/general/Login.js";
import { NavBar } from "../components/general/Navbar.js";
import { verifySession } from "../server_requests/Session.js";

async function Dashboard() {

    const APP = $('#app');
    APP.html('');
    $('#myModal').modal('hide');


    await verifySession();
    NavBar.setLinks();
    

    if (sessionStorage.getItem('token')) {
        APP.append('<h1><u>Dashboard</u></h1>');

        const dashNav = new DashNav();
        const monthSummary = new MonthSummary();
        const nextDue = new NextDue();
        const recPayments = new RecentPayments();

        APP.append(dashNav.html);

        APP.append(
            Row().append(
                $('<div class="col-lg"></div>').append(
                    monthSummary.html
                ),
                $('<div class="col-lg"></div>').append(
                    nextDue.html,
                    recPayments.html
                )
            )
        )

        
        

    }
    else {
        const login = new Login(Dashboard);
        APP.html(login.html);
    }

    
}

export {Dashboard}