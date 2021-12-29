import {post} from './WebRequest.js';


// starts a session for the user if the given credentials are valid
async function startSession(user_name, pass) {
    let token = await post('./server/session/startSession.php', JSON.stringify({user_name: user_name, pass: pass}));

    if (token){
        sessionStorage.setItem('token', token);
        return true;
    } 

    return false;
}



// verify session, clear session if false
async function verifySession() {
    let token = sessionStorage.getItem('token');

    if (token) {

        try {
            let tokenObj = JSON.parse(token);
            if (tokenObj.session) {
                const verify = await post('./server/session/verifySession.php', token);
                if (verify) {
                    sessionStorage.setItem('token', verify);
                    return true;
                }
            }

        }
        catch {
            sessionStorage.clear();
            return false;
        }

        sessionStorage.clear();
        return false;
    }
    
}


export {startSession, verifySession};