import { Bill } from "../../server_requests/Bill.js";
import { Col, Row } from "../general/BasicComponents.js";
import { FloatingContainer } from "../general/FloatingContainer.js"
import { Footer } from "../general/Footer.js";
import { LinkButton } from "../general/LinkButton.js";


class DesktopBill {

    constructor(bill, container, modal) {

        this.container = container;
        this.modal = modal;
        this.html = new FloatingContainer();

        this.html.addClass('col-xl-3');
        this.html.addClass('col-md-5');


        this.bill = bill;
        this.name = bill.bill_name;
        this.type = $(`<p>${bill.bill_type}</p>`);
        this.nextDue = $(`<p>${bill.bill_month_due}/${bill.bill_day_due}/${bill.bill_year_due}</p>`);
        this.amtDue = $(`<p>$${bill.bill_amt}</p>`);
        this.freq = $(`<p>${bill.bill_freq}</p>`);

        this.editBtn = $('<button class="btn btn-dark">Edit</button>');
        this.editBtn.click(() => {
            this.modal.toggle();
            this.modal.load(this.bill);
            this.modal.edit = this.bill.bill_id;
            this.modal.form.removeClass('was-validated');

        });

        this.deleteBtn = $('<button class="btn btn-danger">Delete</button>');
        this.deleteBtn.click(async () => {
            await Bill.deleteBill(this.bill.bill_id);
            await this.populateBills();
            Footer.setFooterPos();
        });
        


        this.html.append(
            $(`<div class="row" >
                    <div class="col">
                        <h4><b>${this.name}</b></h4>
                    </div>
                </div>`),
            $('<hr>'),    
            Row().append(
                Col().append(
                    $('<p><b>Type:</b></p>'),
                    $('<p><b>Due:</b></p>'),
                    $('<p><b>Amount:</b></p>'),
                    $('<p><b>Frequency:</b></p>')
                ),
                Col().append(
                    this.type,
                    this.nextDue,
                    this.amtDue,
                    this.freq
                )
            ),
            $('<hr>'),
            $(`<div class="row text-center no-gutters"></div>`).append(
                Col().append(
                    this.editBtn
                ),
                $('<div class="col">|</div>'),
                Col().append(
                    this.deleteBtn
                )
            )
        );
        
    }

    async populateBills() {
        this.container.html('');
    
        const token = JSON.parse(sessionStorage.getItem('token'));
        const bills = await Bill.getActiveBills(token['id']);
        
        for (let bill of bills) {
    
            const billObject = new DesktopBill(bill, this.container, this.modal);
    
            this.container.append(billObject.html);
    
        }
    }
}

export {DesktopBill}