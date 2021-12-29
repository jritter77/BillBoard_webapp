import { Login } from "../components/Login.js";
import { startSession } from "../server_requests/Session.js";

async function Home() {

    const APP = $('#app');
    APP.html('HOME');




    const login = new Login();

    APP.append(login.form);

    console.log(startSession('user', 'root'));
    
}

export {Home}