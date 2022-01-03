class Dropdown {
    constructor() {
        this.html = $(`<div class="dropdown"></div>`);
        this.btn = $('<button class="btn btn-dark dropdown-toggle" data-toggle="dropdown">Dropdown</button>');
        this.menu = $('<div class="dropdown-menu"></div>');

        this.html.append(
            this.btn,
            this.menu
        )
    }

    addMenuItem(title, action) {
        const item = $(`<a class="dropdown-item">${title}</div>`);
        item.click(e => action(e));
        this.menu.append(item);
    }
}

export {Dropdown}