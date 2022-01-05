class RadioButton {
    constructor(group, label) {
        this.html = $('<div class="form-check"></div>');
        this.label = $('<label class="form-check-label"></label>');
        this.btn = $(`<input type="radio" class="form-check-input" name=${group}>`);

        this.html.append(
            this.label.append(
                this.btn,
                label
            )
        )
    }
}

export {RadioButton}