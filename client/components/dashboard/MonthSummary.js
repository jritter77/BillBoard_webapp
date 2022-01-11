import { Bill } from "../../server_requests/Bill.js";
import { BarGraph } from "../general/BarGraph.js";
import { Col, Row } from "../general/BasicComponents.js";
import { FloatingContainer } from "../general/FloatingContainer.js";

class MonthSummary {
    constructor() {
        this.html = new FloatingContainer();

        this.barGraph = new BarGraph();

        this.barGraph.html.css({'margin-top':'32px'});

        this.totalDue = $('<p>1,245</p>');
        this.totalPaid = $('<p>865</p>');

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
            this.barGraph.html
        );

        this.setGraphValues();
    }

    async setGraphValues() {
        const catTotals = await Bill.getMonthCategoryTotals();
        let total = 0;

        for (let cat in catTotals) {
            this.barGraph.setValue(cat, catTotals[cat]);
            total += catTotals[cat];
        }

        this.totalDue.html(total);
        this.barGraph.displayAllValues();
    }
}

export {MonthSummary}