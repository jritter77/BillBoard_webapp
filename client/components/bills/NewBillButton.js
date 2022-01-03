class NewBillButton {
    constructor(modal) {
        this.modal = modal;
        this.btn = $('<button class="btn btn-dark" style="margin-right:5%">+ New Bill</button>');
        this.btn.click(() => this.openNewBill());
    }

    // opens editbill modal with clear fields
    openNewBill() {
        this.modal.toggle();
        this.modal.clear();
        this.modal.edit = 0;
        this.modal.form.removeClass('was-validated');
    }
}

export {NewBillButton}