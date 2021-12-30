import { DashNav } from "../components/dashboard/dashNav";
import { Login } from "../components/Login";
import { verifySession } from "../server_requests/Session";

async function Dashboard() {

    const APP = $('#app');
    APP.html('');

    await verifySession();
    

    if (sessionStorage.getItem('token')) {
        APP.append('<h1><u>Dashboard</u></h1>');

        const dashNav = new DashNav();

        APP.append(dashNav.html);

    }
    else {
        const login = new Login();
        APP.html(login.html);
    }

    
}

export {Dashboard}