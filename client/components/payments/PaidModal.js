import { Bill } from "../../server_requests/Bill.js";
import { Payment } from "../../server_requests/Payment.js";
import { Payments } from "../../views/Payments.js";
import { RecentPayments } from "../dashboard/RecentPayments.js";
import { Col, Row } from "../general/BasicComponents.js";
import { Modal } from "../general/Modal.js";
import { RadioButton } from "../general/RadioButton.js";

class PaidModal extends Modal {
    constructor(viewer, optViewer=null) {
        super();

        this.viewer = viewer;
        this.optViewer = optViewer;

        this.html = $('<div></div>');

        this.billName = $('<p></p>');
        this.billType = $('<p></p>');
        this.amtDue = $('<p></p>');
        this.dueDate = $('<p></p>');

        this.form = $('<form></form>');

        this.currentDateBtn = new RadioButton('date', 'Current Date');
        this.otherDateBtn = new RadioButton('date', 'Other Date');
        this.dateSelect = $('<input disabled class="form-control" type="date" >');


        this.currentDateBtn.btn.prop('checked', true);
        this.currentDateBtn.btn.on('change', () => this.dateSelect.prop('disabled', true));
        this.otherDateBtn.btn.on('change', () => this.dateSelect.prop('disabled', false));

        
        this.fullAmtBtn = new RadioButton('amt', 'Paid In Full');
        this.otherAmtBtn = new RadioButton('amt', 'Other Amount');
        this.amtField = $('<input disabled class="form-control"></input>');

        this.fullAmtBtn.btn.prop('checked', true);
        this.fullAmtBtn.btn.on('change', () => this.amtField.prop('disabled', true));
        this.otherAmtBtn.btn.on('change', () => this.amtField.prop('disabled', false));

        this.submitBtn = $('<button class="btn btn-primary">Save Changes</button>');
        this.submitBtn.click(() => this.handleSubmit());

        
        


        this.html.append(
            Row().append(
                Col().append(
                    $('<p>Bill Name:</p>'),
                    $('<p>Bill Type:</p>'),
                    $('<p>Amount Due:</p>'),
                    $('<p>Date Due:</p>'),
                ),
                Col().append(
                    this.billName,
                    this.billType,
                    this.amtDue,
                    this.dueDate
                )
            ),
            this.form.append(
                Row().append(
                    Col().append(
                        $('<b>Paid On:</b>'),
                    ),
                ),
                Row().append(
                    Col().append(
                        this.currentDateBtn.html,
                    )
                ),
                Row().append(
                    Col().append(
                        this.otherDateBtn.html,
                    ),
                    $('<div class="col-sm"></div>').append(
                        this.dateSelect,
                    ),
                ),
                Row().append(
                    Col().append(
                        $('<b>Amount Paid</b>'),
                    ),
                ),
                Row().append(
                    Col().append(
                        this.fullAmtBtn.html,
                    )
                ),
                Row().append(
                    Col().append(
                        this.otherAmtBtn.html,
                    ),
                    $('<div class="col-sm"></div>').append(
                        this.amtField,
                    ),
                ),
                
            )
            
        )
        

        this.setTitle('Edit Payment');
        this.setBody(this.html);
        this.setFooter(this.submitBtn);
    }


    load(bill) {
        this.bill = bill;
        this.billName.html(bill.bill_name);
        this.billType.html(bill.bill_type);
        this.amtDue.html(bill.bill_amt);
        this.dueDate.html(`${bill.bill_month_due}/${bill.bill_day_due}/${bill.bill_year_due}`);
    }


    async handleSubmit() {

        let day;
        let month;
        let year;

        let payAmt;

        if (this.currentDateBtn.btn.prop('checked')) {
            const date = new Date();

            day = date.getDate();
            month = date.getMonth() + 1;
            year = date.getFullYear();
        }
        else {
            const date = this.dateSelect.val().split('-');

            day = date[2];
            month = date[1];
            year = date[0];
        }

        if (this.fullAmtBtn.btn.prop('checked')) {
            payAmt = this.amtDue.html();
        }
        else {
            payAmt = this.amtField.val();
        }

        const paymentResult = await Payment.createNewPayment(this.bill.bill_id, day, month, year, payAmt);
        const newBillResult = await Bill.cycleBill(this.bill.bill_id);
        this.toggle();
        this.viewer.refreshDisplay();
        
        if (this.optViewer) {
            this.optViewer.refreshDisplay();
        }

    }
}

export { PaidModal }