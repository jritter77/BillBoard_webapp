import { Col, Row } from "../general/BasicComponents.js";
import { LinkButton } from "../general/LinkButton.js";

class dashBill {
    constructor(modal, bill) {

        this.modal = modal;
        this.bill = bill;

        this.markPaidBtn = new LinkButton('Mark Paid');
        this.markPaidBtn.click(() => {
            this.modal.toggle();
            this.modal.load(this.bill);
        })

        const dateDue = `${bill.bill_month_due}/${bill.bill_day_due}`;

        
        this.html = Row().append(
            $('<div class="col-2"></div>').append(
                $('<p></p>').append(dateDue)
            ),
            $('<div class="col-4"></div>').append(
                $('<p></p>').append(bill.bill_name)
            ),
            $('<div class="col-2"></div>').append(
                $('<p></p>').append(bill.bill_amt)
            ),
            $('<div class="col-4"></div>').append(
                this.markPaidBtn
            ),
        )
    }
}

export {dashBill}