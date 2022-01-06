import { Col, Row } from "../general/BasicComponents.js";
import { LinkButton } from "../general/LinkButton.js";

class PayObj {
    constructor(modal, dateDue, billName, amtDue, datePaid=null) {

        this.modal = modal;
        this.status = $('<p>Current</p>');

        if (!datePaid) {
            datePaid = 'Mark as Paid';
        }

        this.datePaid = new LinkButton(datePaid);

        
        this.html = Row().append(
            Col().append(
                $('<p></p>').append(dateDue)
            ),
            Col().append(
                $('<p></p>').append(this.datePaid)
            ),
            Col().append(
                $('<p></p>').append(billName)
            ),
            Col().append(
                $('<p></p>').append(amtDue)
            ),
            Col().append(
                $('<p></p>').append(this.status)
            ),
        )
    }
}

export {PayObj}