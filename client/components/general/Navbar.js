import { Dropdown } from './Dropdown.js'


class NavBar {

    static brand = $(`<a href='#home' class='navbar-brand'><img src="./images/logo.png"></a>`);

    static links = $('<div class="row align-items-center"></div>');

    static register = $(`<div class='col'><b><a style='color:white;' href="#register">Register</a></b></div>`);
    static login = $(`<div class='col'><b><a style='color:white;' href="#dashboard">Login</a></b></div>`);

    static dashboard = $(`<div class='col'><b><a style='color:white;' href="#dashboard">Dashboard</a></b></div>`);
    static bills = $(`<div class='col'><b><a style='color:white;' href="#bills">Bills</a></b></div>`);
    static payments = $(`<div class='col'><b><a style='color:white;' href="#payments">Payments</a></b></div>`);


    static html = $(`<nav class="navbar navbar-dark" id="nav" style='background: black;'></nav>`).append(
        $('<div class="navbar-header"></div>').append(
            NavBar.brand
        ),
        NavBar.links,
    );


    static init() {
        window.addEventListener('resize', () => NavBar.setLinks());
    }


    static collapseLinks(userDropdown) {
        if (window.innerWidth > 768) {
            NavBar.links.append(
                NavBar.dashboard,
                NavBar.bills,
                NavBar.payments,
            )
        }
        else {
            userDropdown.addMenuItem('Dashboard', () => location.hash = '#dashboard');
            userDropdown.addMenuItem('Bills', () => location.hash = '#bills');
            userDropdown.addMenuItem('Payments', () => location.hash = '#payments');
            userDropdown.menu.append('<hr>');
        }
    }


    static setLinks() {

        NavBar.links.html('');

        if (sessionStorage.getItem('token')) {

            const userDropdown = new Dropdown();
            const user = JSON.parse(sessionStorage.getItem('token')).user;

            userDropdown.btn.html(user);

            NavBar.collapseLinks(userDropdown);
            
            userDropdown.addMenuItem('My Profile', '');
            userDropdown.addMenuItem('Change Password', '');
            userDropdown.menu.append('<hr>');


            userDropdown.addMenuItem('Logout', () => {
                sessionStorage.clear();
                location.hash = '#home';
                NavBar.setLinks();
            });


            NavBar.links.append(
                userDropdown.html
            );

        }
        else {

            this.links.append(
                this.register,
                this.login
            );


        }

    }
}



export { NavBar }