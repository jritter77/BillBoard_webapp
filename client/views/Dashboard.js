import { DashNav } from "../components/dashboard/dashNav.js";
import { Login } from "../components/general/Login.js";
import { verifySession } from "../server_requests/Session.js";

async function Dashboard() {

    const APP = $('#app');
    APP.html('');
    $('#myModal').modal('hide');


    await verifySession();
    

    if (sessionStorage.getItem('token')) {
        APP.append('<h1><u>Dashboard</u></h1>');

        const dashNav = new DashNav();

        APP.append(dashNav.html);

        
        

    }
    else {
        const login = new Login(Dashboard);
        APP.html(login.html);
    }

    
}

export {Dashboard}