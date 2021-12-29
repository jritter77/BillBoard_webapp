import { User } from "../server_requests/User";

async function Home() {

    const APP = $('#app');
    APP.html('');


    const output = $('<div><div>');

    APP.append(output);


    const result = await User.changeEmail(5, null);

    output.append(result);

    
}

export {Home}