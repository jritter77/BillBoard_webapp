class DashNav {

    constructor() {
        this.html = $('<div class="row no-gutters align-items-center " style="margin-top: 64px;margin-bottom: 64px;"></div>');

        this.manageBills = $('<a class="btn btn-dark" style="margin:4px;" href="#bills"><h5>Manage Bills</h5></a>');
        this.managePayments = $('<a class="btn btn-dark" style="margin:4px;" href="#payments"><h5>Manage Payments</h5></a>');
        this.analysis = $('<a class="btn btn-dark" style="margin:4px;" href="#analysis"><h5>Analysis</h5></a>');

        this.manageBills.hover(() => this.manageBills.css({'background-color':'#e03c31'}), () => this.manageBills.css({'background-color':''}));
        this.managePayments.hover(() => this.managePayments.css({'background-color':'#e03c31'}), () => this.managePayments.css({'background-color':''}));
        this.analysis.hover(() => this.analysis.css({'background-color':'#e03c31'}), () => this.analysis.css({'background-color':''}));

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
            $('<div class="col-md" ></div>').append(
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