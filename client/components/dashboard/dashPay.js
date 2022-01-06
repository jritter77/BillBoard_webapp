import { Col, Row } from "../general/BasicComponents.js";

class dashPay {
    constructor(payment) {

        this.payment = payment;

        const dateDue = `${payment.pay_month}/${payment.pay_day}/${payment.pay_year}`;

        
        this.html = Row().append(
            Col().append(
                $('<p></p>').append(dateDue)
            ),
            Col().append(
                $('<p></p>').append(payment.bill_name)
            ),
            Col().append(
                $('<p></p>').append(payment.pay_amt)
            ),
            
        )
    }
}

export {dashPay}