import { FloatingContainer } from "../general/FloatingContainer.js";

class GetStartedButton {
    constructor() {
        this.html = new FloatingContainer().addClass('text-center').css({'margin-top':'32px'});
        
        this.btn = $('<button style="margin:32px;" class="btn btn-dark"><h3>Get Started!</h3></button>');

        this.btn.click(() => {
            location.hash = '#register';
        });

        this.html.append(
            '<h3>Registration is <b>100% free</b> and <u>anonymous</u>!</h3>',
            '<h3>Start tracking your bills today!</h3>',
            '<hr>',
            this.btn
        )
    }
}

export {GetStartedButton}