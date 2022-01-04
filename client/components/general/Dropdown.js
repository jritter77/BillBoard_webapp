class Dropdown {
    constructor() {
        this.html = $(`<div class="dropdown" style="margin-right:32px;margin-left:32px;"></div>`);
        this.btn = $('<button class="btn btn-dark dropdown-toggle" data-toggle="dropdown">Dropdown</button>');
        this.menu = $('<ul class="dropdown-menu dropdown-menu-right" ></ul>');

        this.html.append(
            this.btn,
            this.menu
        )

        
    }

    addMenuItem(title, action) {
        const item = $(`<li><a class="dropdown-item" >${title}</a></li>`);
        item.hover(() => item.css({'cursor':'pointer'}));
        item.click(() => action());
        this.menu.append(item);
    }
}

export {Dropdown}