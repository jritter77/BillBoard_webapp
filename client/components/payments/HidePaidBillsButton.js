class HidePaidBillsButton {
    constructor() {
        this.html = $('<div class="form-group" style="margin-right:32px"></div>');

        this.checkbox = $('<input id="hidePaidBills" type="checkbox" style="margin:16px">');
        this.label = $('<label for="hidePaidBills">Hide Paid Bills</label>');

        this.html.append(
            this.checkbox,
            this.label
        )
    }
}

export {HidePaidBillsButton}