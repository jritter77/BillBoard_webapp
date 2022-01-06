import { Payment } from "../../server_requests/Payment.js";
import { Col, Row } from "../general/BasicComponents.js";
import { FloatingContainer } from "../general/FloatingContainer.js";
import { Footer } from "../general/Footer.js";
import { LinkButton } from "../general/LinkButton.js";
import { dashPay } from "./dashPay.js";

class RecentPayments {
    constructor() {

        this.limit = 4;
        this.offset = 0;


        this.html = new FloatingContainer();

        this.paymentContainer = $('<div style="margin-top:32px;"></div>');

        this.seeMoreButton = new LinkButton('See More');
        this.seeMoreButton.click(() => this.appendPayments());

        this.html.append(
            $('<div class="row text-center"></div>').append(
                Col().append(
                    $('<h3><b>Recent Payments</b></h3>')
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
            ),
            Row().append(
                Col().append(
                    this.paymentContainer
                )
            ),
            $('<div class="row text-center"></div>').append(
                Col().append(
                    this.seeMoreButton
                )
            ),
        );

        this.appendPayments();
    }

    async refreshDisplay() {
        this.paymentContainer.html('');

        this.offset = 0;
        await this.appendPayments();

    }

    async appendPayments() {
        const payments = await Payment.getPayments(this.limit, this.offset);
        this.offset += this.limit;

        for (let payment of payments) {
            const b = new dashPay(payment);
            this.paymentContainer.append(b.html);
        }

        Footer.setFooterPos();

    }
}

export {RecentPayments}