import { Bill } from "../server_requests/Bill.js";
import { startSession, verifySession } from "../server_requests/Session.js";
import { User } from "../server_requests/User.js";

async function Home() {

    const APP = $('#app');
    APP.html('');


    const output = $('<div><div>');

    APP.append(output);


    const result = await Bill.archiveBill(2, false);

    console.log(result);

    

    
}

export {Home}