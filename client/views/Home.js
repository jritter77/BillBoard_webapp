import { Modal } from "../components/Modal.js"



function Home() {

    const APP = $('#app');

    APP.html('');

    const modal = new Modal('Test Modal');
    modal.setBody('<h3>Body Stuff!</h3>');
    modal.toggle();
}

export {Home}