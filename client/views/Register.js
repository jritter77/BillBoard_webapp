import { RegisterForm } from "../components/register/RegisterForm.js";

function Register() {

    const APP = $('#app');
    APP.html('');

    const form = new RegisterForm();

    APP.append(form.html);
    
}

export {Register}