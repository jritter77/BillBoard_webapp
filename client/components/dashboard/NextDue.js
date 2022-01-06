import { Bill } from "../../server_requests/Bill.js";
import { Col, Row } from "../general/BasicComponents.js";
import { FloatingContainer } from "../general/FloatingContainer.js";
import { Footer } from "../general/Footer.js";
import { LinkButton } from "../general/LinkButton.js";
import { PaidModal } from "../payments/PaidModal.js";
import { dashBill } from "./dashBill.js";

class NextDue {
    constructor() {

        this.limit = 4;
        this.offset = 0;

        this.modal = new PaidModal(this);

        this.html = new FloatingContainer();

        this.billContainer = $('<div style="margin-top:32px;"></div>');

        this.seeMoreButton = new LinkButton('See More');
        this.seeMoreButton.click(() => this.appendBills());

        this.html.append(
            $('<div class="row text-center"></div>').append(
                Col().append(
                    $('<h3><b>Next Bills Due</b></h3>')
                )
            ),
            '<hr>',
            Row().append(
                Col().append(
                    $('<b>Date Due</b>')
                ),
                Col().append(
                    $('<b>Bill Name</b>')
                ),
                Col().append(
                    $('<b>Amount Due</b>')
                ),
                Col().append(
                    $('<p></p>')
                ),
            ),
            Row().append(
                Col().append(
                    this.billContainer
                )
            ),
            $('<div class="row text-center"></div>').append(
                Col().append(
                    this.seeMoreButton
                )
            ),
        );

        this.appendBills();
    }

    async refreshDisplay() {
        this.billContainer.html('');

        this.offset = 0;
        await this.appendBills();

        Footer.setFooterPos();
    }

    async appendBills() {
        const bills = await Bill.getActiveBills(this.limit, this.offset);
        this.offset += this.limit;

        for (let bill of bills) {
            const b = new dashBill(this.modal, bill);
            this.billContainer.append(b.html);
        }
    }
}

export {NextDue}