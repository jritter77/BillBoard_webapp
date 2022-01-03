// This is an html object that looks like a link, but is meant to behave like a button
// by setting the click event of the returned object. 

class LinkButton {
    constructor(label) {
        const btn = $(`<p style="cursor:pointer;color:blue;">${label}</p>`);
        btn.on('mouseover', () => btn.css({'text-decoration': 'underline'}));
        btn.on('mouseout', () => btn.css({'text-decoration': 'none'}));
        return btn;
    }
}

export {LinkButton}