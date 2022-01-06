import { Col, Row } from "../general/BasicComponents.js";
import { LinkButton } from "../general/LinkButton.js";

class dashBill {
    constructor(modal, bill) {

        this.modal = modal;
        this.bill = bill;

        this.markPaidBtn = new LinkButton('Mark as Paid');
        this.markPaidBtn.click(() => {
            this.modal.toggle();
            this.modal.load(this.bill);
        })

        const dateDue = `${bill.bill_month_due}/${bill.bill_day_due}/${bill.bill_year_due}`;

        
        this.html = Row().append(
            Col().append(
                $('<p></p>').append(dateDue)
            ),
            Col().append(
                $('<p></p>').append(bill.bill_name)
            ),
            Col().append(
                $('<p></p>').append(bill.bill_amt)
            ),
            Col().append(
                this.markPaidBtn
            ),
        )
    }
}

export {dashBill}