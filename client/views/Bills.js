import { DesktopBill } from "../components/bills/DesktopBill.js";
import { EditBillModal } from "../components/bills/EditBillModal.js";
import { NewBillButton } from "../components/bills/NewBillButton.js";
import { Dropdown } from "../components/general/Dropdown.js";
import { Footer } from "../components/general/Footer.js";
import { Login } from "../components/general/Login.js";
import { NavBar } from "../components/general/Navbar.js";
import { Select } from "../components/general/Select.js";
import { Bill } from "../server_requests/Bill.js";
import { verifySession } from "../server_requests/Session.js";


const billsContainer = $('<div class="row"></div>');


async function populateBills(modal) {
    billsContainer.html('');

    const token = JSON.parse(sessionStorage.getItem('token'));
    const bills = await Bill.getActiveBills(token['id']);
    
    for (let bill of bills) {

        const billObject = new DesktopBill(bill, billsContainer, modal);

        billsContainer.append(billObject.html);

    }

    Footer.setFooterPos();

}




async function Bills() {

    const APP = $('#app');
    APP.html('');

    await verifySession();
    NavBar.setLinks();
    
    if (sessionStorage.getItem('token')) {
        APP.append('<h1><u>My Bills</u></h1>');

        const billModal = new EditBillModal();

        const newBillBtn = new NewBillButton(billModal);

        APP.append($('<div class="row text-right"></div>').append(
            $('<div class="col"></div>').append(
                newBillBtn.btn
            )
        ));

        APP.append(billsContainer);

        populateBills(billModal);

    }
    else {
        const login = new Login(Bills);
        APP.html(login.html);
    }
}

export {Bills, populateBills}