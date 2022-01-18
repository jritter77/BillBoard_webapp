import { FloatingContainer } from "../general/FloatingContainer.js";

class SiteSummary {
    constructor() {
        
        this.summary = `
            BillSpotter is an anonymous and an easy to use tool designed to assist with tracking and monitoring your bills.
            <br><br>BillSpotter is essentially a semi-automated checklist that keeps track of upcoming bill due dates and payments made
            on those bills. 

        `;

        this.html = new FloatingContainer().css({'margin-top':'32px'});

        this.html.append('<h3><u>Bill Tracking Made Simple</u></h3>');

        this.html.append(`<p style="margin-top:32px;">${this.summary}</p>`);
    }
}

export {SiteSummary}