class NewBillButton {
    constructor(modal) {
        this.modal = modal;
        this.btn = $('<button class="btn btn-dark" style="margin-right:5%;">+ New Bill</button>');
        this.btn.hover(() => this.btn.css({'background-color':'#e03c31'}), () => this.btn.css({'background-color':''}));
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