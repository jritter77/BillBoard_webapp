class Select {
    constructor(label, vals=[]) {
        this.html = $('<div class="form-group"></div>');
        this.label = $(`<label for="${label}Select"><b>${label}</b></label>`);
        this.select = $(`<select class="form-control" id="${label}Select"></select>`);
        this.options = {};

        this.html.append(
            this.label,
            this.select
        );

        for (let val of vals) {
            this.addOption(val);
        }

    }

    addOption(option) {
        const opt = $(`<option>${option}</option>`);
        this.select.append(opt);
        this.options[option] = opt;
        return opt;
    }
}

export {Select}