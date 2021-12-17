
function NavBar() {

return `
    <nav class="navbar navbar-dark" id="nav" style='background: black;'>
        <div class="container-fluid">
            <div class='row'>
                <div class='col'>
                    <div class="navbar-header">
                        <a href='#home' class='navbar-brand'><b>Bill Board</b></a>
                        
                    </div>
                </div>
            </div>
            <div class='row'>
                <div class='col'><b><a style='color:white;' href="#catalog">Register</a></b></div>
                <div class='col'><b style='color:white;'> | </b></div>
                <div class='col'><b><a style='color:white;' href="#about">Login</a></b></div>
            </div>
        </div>
    </nav>`;
}

export {NavBar}