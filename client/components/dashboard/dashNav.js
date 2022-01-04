class DashNav {

    constructor() {
        this.html = $('<div class="row no-gutters align-items-center " style="margin: 5%;"></div>');

        this.manageBills = $('<h5><a style="color:black;" href="#bills">Manage Bills</a></h5>');
        this.managePayments = $('<h5><a style="color:black;" href="#payments">Manage Payments</a></h5>');
        this.analysis = $('<h5><a style="color:black;" href="#analysis">Analysis</a></h5>');

        if (window.innerWidth > 768) {
            this.html.addClass('text-center');
        }

        const resizeHandler = () => {
            if (window.innerWidth > 768) {
                this.html.addClass('text-center');
                this.html.removeClass('text-left');
            }
            else {
                this.html.removeClass('text-center');
                this.html.addClass('text-left');
            }
        }

        window.addEventListener('resize', resizeHandler);
        

        this.html.append(
            $('<div class="col-md"></div>').append(
                this.manageBills
            ),
            $('<div class="col-md"></div>').append(
                this.managePayments
            ),
            $('<div class="col-md"></div>').append(
                this.analysis
            ),
        );
    }

}

export {DashNav}