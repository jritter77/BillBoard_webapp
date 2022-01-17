class GetStartedButton {
    constructor() {
        this.html = $('<button class="btn btn-dark"><h3>Get Started!</h3></button>');

        this.html.click(() => {
            location.hash = '#register';
        });
    }
}

export {GetStartedButton}