import { FloatingContainer } from "../general/FloatingContainer.js";

class SiteHighlights {
    constructor() {
        this.html = new FloatingContainer();

        this.html.append('<h3><u>Features:</u></h3>');

        this.html.append(
            $(`<ul></ul>`).append(
                '<li>Easily track and monitor your bills and their status!</li>',
                '<li>100% anonymous, only a username and password are necessary!</li>',
                '<li>Simple and easy to use interface!</li>',
                '<li>BillSpotter\'s Month Summary makes staying on track a breeze!</li>',
            )
        )
    }
}

export {SiteHighlights}