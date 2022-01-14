import { Col, Row } from "./BasicComponents.js";

class BarGraph {
    constructor() {
        
        this.colors = ['red', 'blue', 'green', 'violet', 'yellow', 'brown', 'orange'];

        this.values = {};

        this.html = $('<div></div>');


        this.displayAllValues();
        
    }

    setValue(label, val1, val2=0) {
        this.values[label] = {val1: val1, val2: val2};
    }

    displayAllValues() {
        this.html.html('');
        
        let high = 0;

        let i = 0;

        for (let label in this.values) {
            if (this.values[label].val1 > high) {
                high = this.values[label].val1;
            }

            if (this.values[label].val2 > high) {
                high = this.values[label].val2;
            }
        }

        console.log(high);
        for (let label in this.values) {
            const val1 = this.values[label].val1;
            const size1 = 100*val1/high;
            const val2 = this.values[label].val2;
            const size2 = 100*val2/high;
            this.html.append(new DoubleEntry(label, size1, val1, size2, val2, 'orange', 'lightgreen').html);
        }
    }

    
   
}

class Entry {
    constructor(label, size, val, color='black') {
        this.html = $('<div class="row align-items-center"></div>');

        this.label = $(`<p>${label}</p>`);
        this.bar = new Bar(size, color);
        this.val = $(`<p>${val}</p>`);

        this.html.append(
            $('<div class="col-2"></div>').append(
                this.label
            ),
            Col().append(
                this.bar.html
            ),
            $('<div class="col-2"></div>').append(
                this.val
            ),
        )
    }
}


class DoubleEntry {
    constructor(label, size1, val1, size2, val2, color1='black', color2='red') {
        this.html = $('<div class="row align-items-center "></div>');

        this.label = $(`<p>${label}</p>`);

        this.bar1 = new Bar(size1, color1);
        this.val1 = $(`<p>${val1}</p>`);

        this.bar2 = new Bar(size2, color2);
        this.val2 = $(`<p>${val2}</p>`);

        this.html.append(
            $('<div class="col-2"></div>').append(
                this.label
            ),
            Col().append(
                this.bar1.html,
                this.bar2.html
            ),
            $('<div class="col-2"></div>').append(
                this.val1,
                this.val2
            ),
        )
    }
}


class Bar {
    constructor(size, color) {
        this.html = $(`<p style='height:16px;width:${size}%;background:${color};'></p>`);
    }

}



export {BarGraph}