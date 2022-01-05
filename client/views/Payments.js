import { Col, Row } from "../components/general/BasicComponents.js";
import { DesktopPaymentViewer } from "../components/payments/DesktopPaymentViewer.js";
import { HidePaidBillsButton } from "../components/payments/HidePaidBillsButton.js";
import { PaidModal } from "../components/payments/PaidModal.js";
import { Payment } from "../server_requests/Payment.js";

async function Payments() {

    const APP = $('#app');
    APP.html('');

    if (sessionStorage.getItem('token')) {
        APP.append('<h1><u>My Payments</u></h1>');

        const paidModal = new PaidModal();
        const hidePaidBillsBtn = new HidePaidBillsButton();
        const billViewer = new DesktopPaymentViewer();

        

        APP.append($('<div class="row text-right"></div>').append(
            Col().append(
                hidePaidBillsBtn.html
            )
        ));

        APP.append(
            Row().append(
                Col().append(
                    billViewer.html
                )
            )
        )

    }
    else {
        const login = new Login(Bills);
        APP.html(login.html);
    }

    
}

export {Payments}