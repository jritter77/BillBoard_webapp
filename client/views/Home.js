import { startSession, verifySession } from "../server_requests/Session.js";
import { User } from "../server_requests/User.js";

async function Home() {

    const APP = $('#app');
    APP.html('');


    const output = $('<div><div>');

    APP.append(output);


    const result = await startSession('User1', 'root');

    output.append(result);

    const button = $('<button class="btn btn-primary">verify session</button>');

    button.click(() => {
        verifySession();
    });

    APP.append(button);

    
}

export {Home}