import { Bill } from "../../server_requests/Bill.js";
import { Col, Dot, Row } from "./BasicComponents.js";

class Calendar {
    constructor() {
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        this.dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.date = new Date();

        this.monthLabel = $(`<h4>${this.months[this.date.getMonth()]} - ${this.date.getFullYear()}</h4>`);

        this.html = $('<div class="text-center"></div>');

        this.legend = Row().append(
            Col().append(
                Dot('lightgreen'),
                $('<b> Paid</b>')
            ),
            Col().append(
                Dot('orange'),
                $('<b> Due</b>')
            ),
            Col().append(
                Dot('#e03c31'),
                $('<b> Past Due</b>')
            )
        ).addClass('text-center');


        this.populateDates();
    }

    // returns the date of the top left square for any given date and day
    getStartDate(date, day) {
        let result = (date % 7) - day;

            while (result > 1) {
                result -= 7;
            }
        
        return result;
    }


    // checks if the current year is a leapyeear
    checkLeapYear(year) {
        if (!(year % 4)) {
            this.dCount[1] = 29;
        }
        else {
            this.dCount[1] = 28;
        }
    }


    getDay(i, month) {
 
        this.checkLeapYear();

        if (i < 1) {
            return '';
        }
        else if (i > this.dCount[month]) {
            return '';
        }
        else {
            return i;
        }
    }


    getCurrentMonth() {
        let start = this.getStartDate(this.date.getDate(), this.date.getDay());

        const days = [];

        for (let i=0; i<42; i++) {
            days.push(this.getDay(start, this.date.getMonth()));
            start++;
        }

        return days;
    }

    async refreshDisplay() {
        await this.populateDates();
    }


    async populateDates() {

        this.html.html('');
        this.html.append(this.monthLabel);

        const days = this.getCurrentMonth();
        const events = await this.getEvents();

        let i = 0;

        let row = $('<div class="row no-gutters"></div>');

        for (let day of days) {
            const border = (this.date.getDate() === day) ? '2px solid black' : '';

            
            if (events[day]) {
                let tooltip = '';
                let color = 'lightgreen';

                let paid = false;
                let due = false;
                let pastDue = false;


                for (let e of events[day]) {
                    tooltip += '$' + e.bill_amt + ' ' + e.bill_name + ' - ' + ((e.pay_amt) ? 'Paid' : 'Due') + '<br>';

                    if (!e.pay_amt) {
                        due = true;

                        if (this.date.getDate() > day) {
                            pastDue = true;
                        }
                    }
                    else {
                        paid = true;
                    }
                    
                }

                if (paid && due && pastDue) {
                    color = 'linear-gradient(to bottom left, #e03c31 50%, lightgreen 20%)';
                }
                else if (paid && due) {
                    color = 'linear-gradient(to bottom left, orange 50%, lightgreen 20%)';
                }
                else if (paid) {
                    color = 'lightgreen';
                }
                else if (due) {
                    color = 'orange';

                    if (pastDue) {
                        color = '#e03c31';
                    }
                }

                row.append(
                    Col().append(
                        $(`<p data-html="true" style="margin:4px;background:${color};border:${border}"  data-toggle="tooltip" data-placement="top" title="${tooltip}"></p>`).append(day).tooltip()
                    )
                );

                
            }
            else {
                row.append(
                    Col().append(
                        $(`<p style="border:${border}"></p>`).append(day)
                    )
                );
            }
            

            i++;

            if (!(i % 7)) {
                this.html.append(row);
                row = $('<div class="row no-gutters"></div>');
            }

            this.html.append(this.legend);

        }

    }

    async getEvents() {
        const monthBills = await Bill.getCurrentMonthBills();
        const events = {};

        for (let bill of monthBills) {
            const event = {bill_name: bill.bill_name, bill_amt: bill.bill_amt, pay_amt: null, pay_date: null};
            const payment = await Bill.verifyPaid(bill.bill_id);


            if (payment) {
                event.pay_amt = payment.pay_amt;
                event.pay_date = `${payment.pay_month}/${payment.pay_day}/${payment.pay_year}`;
            }

            if (events[bill.bill_day_due]) {
                events[bill.bill_day_due].push(event);
            }
            else {
                events[bill.bill_day_due] = [event];
            }
        }

        return events;

        
    }


}


export {Calendar}