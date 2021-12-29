import { get, post } from "./webRequest.js";

class User {

    static async createNewUser(username, password, email=null) {
        const endpoint = './server/db/user/newUser.php';
        const params = JSON.stringify({user_name: username, pass: password, user_email: email});

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
        
    }


    static async getUser(userId) {
        const endpoint = './server/db/user/getUser.php';
        const params = JSON.stringify({user_id: userId});

        const result = await get(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async getAllUsers() {
        const endpoint = './server/db/user/getAllUsers.php';

        const result = await get(endpoint);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async changeUsername(user_id, user_name) {
        const endpoint = './server/db/user/changeUsername.php';
        const params = JSON.stringify({user_id: user_id, user_name: user_name});

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }

    static async changePassword(user_id, pass) {
        const endpoint = './server/db/user/changePassword.php';
        const params = JSON.stringify({user_id: user_id, pass: pass});

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }


    static async changeEmail(user_id, email) {
        const endpoint = './server/db/user/changeEmail.php';
        const params = JSON.stringify({user_id: user_id, user_email: email});

        const result = await post(endpoint, params);

        try {
            const data = JSON.parse(result);
            return data;
        }
        catch (err) {
            console.log(err);
            console.log(result);
            return result;
        }
    }
    
}

export {User}