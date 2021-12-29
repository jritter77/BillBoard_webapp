import { startSession } from "../server_requests/Session";
import { Dashboard } from "../views/Dashboard";

class Login {
    
    constructor() {

        this.row = $('<div class="row"></div>');
        this.col = $('<div class="col"></div>');

        this.form = $('<form class="needs-validation" novalidate ></form>');

        this.userGroup = $('<div class="form-group"></div>');
        this.passGroup = $('<div class="form-group"></div>');

        this.userField = $('<input class="form-control" id="user" required></input>');
        this.passField = $('<input type="password" class="form-control" id="pass" required></input>');

        this.userLabel = $('<label for="user">Username</label>');
        this.passLabel = $('<label for="pass">Password</label>');

        this.feedback = $('<div class="invalid-feedback">Invalid Username/Password!</div>');

        this.submitButton = $('<button type="submit" class="btn btn-primary">Login</button>');

        this.submitButton.click(e => this.login(e));

        this.row.append(
            this.col.append(
                this.form.append(
                    this.userGroup.append(
                        this.userLabel,
                        this.userField
                    ),
                    this.passGroup.append(
                        this.passLabel,
                        this.passField,
                        this.feedback
                    ),
                    this.submitButton
                )
            )
        );

        
    }


    async login(e) {
        e.preventDefault();

        if (await startSession(this.userField.val(), this.passField.val()) ) {
            location.hash = '#dashboard';
        }
        else {
            this.passField.val('');
        }   

        this.form.addClass("was-validated");
    }


}

export {Login}