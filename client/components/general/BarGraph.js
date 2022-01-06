import { Col } from "./BasicComponents";

class BarGraph {
    constructor() {
        
        this.colors = ['red', 'blue', 'green', 'violet', 'yellow', 'brown', 'orange'];

        this.values = {};

        this.html = $('<div></div>');

        this.setValue('cat1', 64);
        this.setValue('cat2', 124);
        this.setValue('cat3', 32);
        this.setValue('cat4', 89);

        this.displayAllValues();
        
    }

    setValue(label, val) {
        this.values[label] = val;
    }

    displayAllValues() {
        this.html.html('');
        
        let high = 0;

        let i = 0;

        for (let label in this.values) {
            if (this.values[label] > high) {
                high = this.values[label];
            }
        }

        for (let label in this.values) {
            const val = this.values[label];
            const percent = 100*val/high;
            this.html.append(new Entry(label, percent, val, this.colors[i++]).html);
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


class Bar {
    constructor(size, color) {
        this.html = $(`<p style='height:16px;width:${size}%;background:${color};'></p>`);
    }


}

export {BarGraph}