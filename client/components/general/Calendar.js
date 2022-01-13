import { Col, Row } from "./BasicComponents.js";

class Calendar {
    constructor() {
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        this.dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.date = new Date();


        this.html = $('<div class="text-center"></div>');

        this.populateDates();
    }

    // returns the date of the top left square for any given date and day
    getStartDate(date, day) {
        let result = (date % 7) - day;

            while (result > 1) {
                result -= 7;
            }
        
        return result;
    }


    // checks if the current year is a leapyeear
    checkLeapYear(year) {
        if (!(year % 4)) {
            this.dCount[1] = 29;
        }
        else {
            this.dCount[1] = 28;
        }
    }


    getDay(i, month) {
 
        this.checkLeapYear();

        if (i < 1) {
            return this.dCount[((month - 1 < 0) ? 11 : month - 1)] + i;
        }
        else if (i > this.dCount[month]) {
            return i - this.dCount[month];
        }
        else {
            return i;
        }
    }


    getCurrentMonth() {
        let start = this.getStartDate(this.date.getDate(), this.date.getDay());

        const days = [];

        for (let i=0; i<42; i++) {
            days.push(this.getDay(start, this.date.getMonth()));
            start++;
        }

        return days;
    }


    populateDates() {

        this.html.html('');

        const days = this.getCurrentMonth();

        let i = 0;

        let row = $('<div class="row no-gutters"></div>');

        for (let day of days) {
            row.append(
                Col().append(
                    $('<p></p>').append(day)
                )
            );

            i++;

            if (!(i % 7)) {
                this.html.append(row);
                row = $('<div class="row no-gutters"></div>');
            }
        }

    }


}


export {Calendar}