class Footer {
    static html = $(`
    <div class='row no-gutters align-items-center' style='min-height: 64px'>
        <div class='col-md text-center'>
            <a href='#about'><b style='color:white;'>About</b></a>
        </div>
        <div class='col-md text-center'>
            <a href='#contact'><b style='color:white;'>Contact</b></a>
        </div>
        <div class='col-md text-center'>
            <a href='#terms'><b style='color:white;'>Terms & Conditions</b></a>
        </div>
        <div class='col-md text-center'>
            <a href='#support'><b style='color:white;'>Support</b></a>
        </div>
    </div>
    `);

    static setFooterPos = () => {
        if (window.innerHeight > $('#app').height()) {
            $('#footer').css({'position':'absolute'});
        }
        else {
            $('#footer').css({'position':'static'});
        }
    }
}

export {Footer}