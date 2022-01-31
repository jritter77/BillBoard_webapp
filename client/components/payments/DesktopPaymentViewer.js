import { Bill } from "../../server_requests/Bill.js";
import { Payment } from "../../server_requests/Payment.js";
import { Row, Col } from "../general/BasicComponents.js";
import { FloatingContainer } from "../general/FloatingContainer.js";
import { Footer } from "../general/Footer.js";
import { LinkButton } from "../general/LinkButton.js";
import { PaidModal } from "./PaidModal.js";
import { PayObj } from "./PayObj.js";

class DesktopPaymentViewer {
    constructor() {

        this.limit = 5;
        this.offset = 0;

        this.modal = new PaidModal(this);
        this.html = new FloatingContainer();

        this.paymentsContainer = $('<div></div>');

        this.showMoreBtn = new LinkButton('Show More');

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
                ),
                Col().append(
                    $('<b>Action</b>')
                )
            ),
            '<hr>',
            this.paymentsContainer,
            $("<div class='row text-center'></div>").append(
                Col().append(
                    this.showMoreBtn
                )
            )
        );

        this.refreshDisplay();
    }


    async appendBills() {
        const bills = await Bill.getActiveBills();
        const date = new Date();

        for (let bill of bills) {
            const b = new PayObj(
                                this.modal,
                                `${bill.bill_month_due}/${bill.bill_day_due}/${bill.bill_year_due}`,
                                bill.bill_name,
                                bill.bill_amt
            );

            b.action.click(() => {
                this.modal.toggle();
                this.modal.load(bill);

            });

            let pastDue = false;

            if (bill.bill_year_due < date.getFullYear()) {
                pastDue = true;
            }
            else if (bill.bill_year_due === date.getFullYear()) {
                if (bill.bill_month_due < (date.getMonth()+1)) {
                    pastDue = true;
                }
                else if (bill.bill_month_due === date.getMonth()+1) {
                    if (bill.bill_day_due < date.getDate()) {
                        pastDue = true;
                    }
                }
            }

            if (pastDue) {
                b.status.html('Past Due');
                b.status.css({'color':'red'});
            }


            this.paymentsContainer.append(b.html, '<hr>');
        }
    }

    async appendPayments() {
        const payments = await Payment.getPayments(this.limit, this.offset);
        
        for (let pay of payments) {
            const p = new PayObj(
                                this.modal,
                                `${pay.bill_month_due}/${pay.bill_day_due}/${pay.bill_year_due}`,
                                pay.bill_name,
                                pay.pay_amt, 
                                `${pay.pay_month}/${pay.pay_day}/${pay.pay_year}`
            );

            p.action.click(async () => {
                const newest = await Bill.getMostRecentBill(pay.bill_name);
                console.log(newest.result);
                await Bill.deleteBill(newest.result);
                await Bill.archiveBill(pay.bill_id, 0);
                await Payment.deletePayment(pay.pay_id);
                await this.refreshDisplay();

            });

            p.status.html('Paid');
            p.status.css({'color':'lightgreen'});
            

            this.paymentsContainer.append(p.html, '<hr>');
        }
    }


    async refreshDisplay() {
        this.paymentsContainer.html('');

        await this.appendBills();
        await this.appendPayments(0);
        this.showMoreBtn.click(() => this.showMore());

        

        Footer.setFooterPos();


    }

    async showMore() {
        this.offset += this.limit;
        await this.appendPayments();

        
        Footer.setFooterPos();
    }
}




export {DesktopPaymentViewer}