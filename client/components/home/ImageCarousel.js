import { FloatingContainer } from "../general/FloatingContainer.js";

class ImageCarousel {
    constructor() {
        this.html = new FloatingContainer().css({'background-color':'black', 'margin-top':'32px'});

        this.carousel = $('<div id="carouselIndicators" class="carousel slide" data-ride="carousel"></div>');

        this.indicators = $(`
            <ol class="carousel-indicators">
                <li style="background-color: black;" data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
                <li style="background-color: black;" data-target="#carouselIndicators" data-slide-to="1"></li>
                <li style="background-color: black;" data-target="#carouselIndicators" data-slide-to="2"></li>
            </ol>`
        )

        this.controls = $(`
            <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
                <span style="background-color: black" class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
                <span style="background-color: black" class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>`
        );

        this.html.append(
            this.carousel.append(
                this.indicators,
                $('<div class="carousel-inner"></div>').append(
                    $('<div class="carousel-item active"><img style="width:100%;" src="./images/Bills.PNG"></div>'),
                    $('<div class="carousel-item"><img style="width:100%;" src="./images/Payments.PNG"></div>'),
                    $('<div class="carousel-item"><img style="width:100%;" src="./images/MonthSummary.PNG"></div>'),
                ),
                this.controls
            )
        )
    }
}

export { ImageCarousel }