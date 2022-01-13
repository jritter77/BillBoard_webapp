import { Bill } from "../../server_requests/Bill.js";
import { Payment } from "../../server_requests/Payment.js";
import { BarGraph } from "../general/BarGraph.js";
import { Col, Row } from "../general/BasicComponents.js";
import { Calendar } from "../general/Calendar.js";
import { FloatingContainer } from "../general/FloatingContainer.js";

class MonthSummary {
    constructor() {
        this.html = new FloatingContainer();

        this.barGraph = new BarGraph();

        this.barGraph.html.css({'margin-top':'32px'});

        this.totalDue = $('<p>1,245</p>');
        this.totalPaid = $('<p>865</p>');

        this.cal = new Calendar();

        this.html.append(
            $('<div class="row text-center"></div>').append(
                Col().append(
                    '<h3><b>Month Summary</b></h3>'
                )
            ),
            '<hr>',
            $('<div class="row" style="margin-top:32px;"></div>').append(
                Col().append(
                    '<b>Total Due:</b>'
                ),
                Col().append(
                    this.totalDue
                ),
            ),
            Row().append(
                Col().append(
                    '<b>Total Paid:</b>'
                ),
                Col().append(
                    this.totalPaid
                ),
            ),
            '<hr>',
            this.barGraph.html,
            '<hr>',
            this.cal.html
        );

        this.refreshDisplay();
    }

    async refreshDisplay() {
        const catTotalsDue = await Bill.getMonthCategoryTotals();
        const catTotalsPaid = await Payment.getMonthCategoryTotals();


        let totalDue = 0;

        for (let cat in catTotalsDue) {
            this.barGraph.setValue(cat, catTotalsDue[cat]);
            totalDue += catTotalsDue[cat];
        }

        let totalPaid = 0;

        for (let cat of catTotalsPaid) {
            totalPaid += cat.total;
        }

        this.totalDue.html(totalDue);
        this.totalPaid.html(totalPaid);
        this.barGraph.displayAllValues();
    }


}

export {MonthSummary}