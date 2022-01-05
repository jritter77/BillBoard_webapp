import { Select } from "../general/Select.js";
import { Modal } from "../general/Modal.js";
import { Bill } from "../../server_requests/Bill.js";
import { populateBills } from "../../views/Bills.js";
import { Col, Row } from "../general/BasicComponents.js";

class EditBillModal extends Modal {
    constructor() {
        super();

        const BILL_TYPES = ['none', 'home', 'auto', 'medical', 'custom1', 'custom2', 'custom3'];
        const BILL_FREQS = ['one-time', 'weekly', 'bi-weekly', 'monthly', 'annually'];

        // if edit != 0, then create new; else edit bill with id value of edit.
        this.edit = 0;

        this.setTitle("Edit Bill");

        this.form = $('<form class="needs-validation" novalidate ></form>');


        this.nameGroup = $('<div class="form-group"></div>');
        this.nameLabel = $('<label for="name"><b>Bill Name</b></label>');
        this.nameField = $('<input class="form-control" id="name" required></input>');
        this.nameFeedback = $('<div class="invalid-feedback"></div>');

        this.typeSelect = new Select('Bill Type', BILL_TYPES);

        this.freqSelect = new Select('Frequency', BILL_FREQS);


        this.amtGroup = $('<div class="form-group"></div>');
        this.amtLabel = $('<label for="name"><b>Amount Due</b></label>');
        this.amtField = $('<input class="form-control" id="name" required></input>');
        this.amtField.val('0.00');
        this.amtFeedback = $('<div class="invalid-feedback"></div>');


        this.dateGroup = $('<div class="form-group"></div>');
        this.dateLabel = $('<label for="date"><b>Date Due</b></label>');
        this.dateSelect = $('<input class="form-control" type="date" id="date" required>');
        this.dateFeedback = $('<div class="invalid-feedback"></div>');


        this.submitButton = $('<button class="btn btn-primary">Save Changes</button>');

        this.submitButton.click(() => this.handleSubmit());

        this.setBody(
            this.form.append(
                Row().append(
                    Col().append(
                        this.nameGroup.append(
                            this.nameLabel,
                            this.nameField,
                            this.nameFeedback
                        )
                    )
                ),
                Row().append(
                    Col().append(
                        this.typeSelect.html
                    ),
                    Col().append(
                        this.freqSelect.html
                    )
                ),
                Row().append(
                    Col().append(
                        this.amtGroup.append(
                            this.amtLabel,
                            this.amtField,
                            this.amtFeedback
                        )
                    ),
                    Col().append(
                        this.dateGroup.append(
                            this.dateLabel,
                            this.dateSelect,
                            this.dateFeedback
                        )
                    )
                )
            )
        );

        this.setFooter(this.submitButton);

    }

    clear() {
        this.form.trigger('reset');
    }

    load(bill) {
        this.nameField.val(bill.bill_name);
        this.amtField.val(bill.bill_amt);
        this.typeSelect.select.val(bill.bill_type);
        this.freqSelect.select.val(bill.bill_freq);

        let day = bill.bill_day_due.toString();
        if (day.length < 2) {
            day = '0' + day;
        }

        let month = bill.bill_month_due.toString();
        if (month.length < 2) {
            month = '0' + month;
        }

        this.dateSelect.val(`${bill.bill_year_due}-${month}-${day}`);

    }

    async handleSubmit() {

        if (this.nameField.val() && this.amtField.val() && this.dateSelect.val()) {

            const date = this.dateSelect.val().split('-');
            const token = JSON.parse(sessionStorage.getItem('token'));
            
            if (this.edit) {
                await Bill.editBill(this.edit,
                    this.nameField.val(),
                    this.amtField.val(),
                    this.typeSelect.select.val(),
                    date[2],
                    date[1],
                    date[0],
                    this.freqSelect.select.val()
                );
            }
            else {
                await Bill.createNewBill(
                    token.user_id,
                    this.nameField.val(),
                    this.amtField.val(),
                    this.typeSelect.select.val(),
                    date[2],
                    date[1],
                    date[0],
                    this.freqSelect.select.val()
                );
            }


            this.toggle();

            populateBills(this);

        }
        else {

            if (!this.nameField.val()) {
                this.nameFeedback.html('Please enter a name for the bill.');
            }

            if (!this.amtField.val()) {
                this.amtFeedback.html('Please enter an amount due for the bill.');
            }

            if (!this.nameField.val()) {
                this.dateFeedback.html('Please enter a valid due date for the bill.');
            }

            this.form.addClass('was-validated');
        }





    }
}

export { EditBillModal }