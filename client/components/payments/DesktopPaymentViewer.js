import { Bill } from "../../server_requests/Bill.js";
import { Payment } from "../../server_requests/Payment.js";
import { Row, Col } from "../general/BasicComponents.js";
import { FloatingContainer } from "../general/FloatingContainer.js";
import { Footer } from "../general/Footer.js";
import { LinkButton } from "../general/LinkButton.js";

class DesktopPaymentViewer {
    constructor() {
        this.html = new FloatingContainer();

        this.paymentsContainer = $('<div></div>');

        this.showMore = new LinkButton('Show More');

        this.html.append(
            Row().append(
                Col().append(
                    $('<b>Date Due</b>')
                ),
                Col().append(
                    $('<b>Date Paid</b>')
                ),
                Col().append(
                    $('<b>Bill Name</b>')
                ),
                Col().append(
                    $('<b>Amt Due/Paid</b>')
                ),
                Col().append(
                    $('<b>Status</b>')
                )
            ),
            '<hr>',
            this.paymentsContainer,
            $("<div class='row text-center'></div>").append(
                Col().append(
                    this.showMore
                )
            )
        );

        this.displayAllPayments();
    }




    async displayAllPayments() {
        const bills = await Bill.getAllBills();
        const payments = await Payment.getAllPayments();

        for (let bill of bills) {
            const b = new PayObj(`${bill.bill_month_due}/${bill.bill_day_due}/${bill.bill_year_due}`,
                                bill.bill_name,
                                bill.bill_amt
            );

            this.paymentsContainer.append(b.html, '<hr>');
        }
        
        for (let pay of payments) {
            const p = new PayObj(`${pay.bill_month_due}/${pay.bill_day_due}/${pay.bill_year_due}`,
                                pay.bill_name,
                                pay.bill_amt, 
                                `${pay.pay_month}/${pay.pay_day}/${pay.pay_year}`
            );
            

            this.paymentsContainer.append(p.html, '<hr>');
        }

        Footer.setFooterPos();


    }
}


class PayObj {
    constructor(dateDue, billName, amtDue, datePaid=null) {

        this.status = 'current';

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

export {DesktopPaymentViewer}