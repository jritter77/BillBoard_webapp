import { FloatingContainer } from "../general/FloatingContainer.js";

class ImageCarousel {
    constructor() {
        this.html = new FloatingContainer().css({'background-color':'black', 'margin-top':'32px'});

        this.carousel = $('<div class="carousel slide" data-ride="carousel"></div>');

        this.html.append(
            this.carousel.append(
                $('<div class="carousel-inner"></div>').append(
                    $('<div class="carousel-item active"><img style="width:100%;" src="./images/Bills.PNG"></div>'),
                    $('<div class="carousel-item"><img style="width:100%;" src="./images/Payments.PNG"></div>'),
                    $('<div class="carousel-item"><img style="width:100%;" src="./images/MonthSummary.PNG"></div>'),
                )
            )
        )
    }
}

export { ImageCarousel }