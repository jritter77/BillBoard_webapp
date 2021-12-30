import { verifySession } from "../server_requests/Session.js";

async function Bills() {

    const APP = $('#app');
    APP.html('BILLS');

    await verifySession();
    
    if (sessionStorage.getItem('token')) {
        APP.append('<h1>My Bills</h1>');

    }
    else {
        const login = new Login();
        APP.html(login.html);
    }
}

export {Bills}