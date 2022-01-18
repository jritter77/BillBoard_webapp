import { startSession } from "../../server_requests/Session.js";
import { User } from "../../server_requests/User.js";
import { FloatingContainer } from "../general/FloatingContainer.js";

class RegisterForm {
    constructor() {

        this.html = new FloatingContainer().css({'margin-top':'32px'});

        this.form = $('<form class="needs-validation" novalidate ></form>');

        this.userGroup = $('<div class="form-group"></div>');
        this.passGroup = $('<div class="form-group"></div>');
        this.passCheckGroup = $('<div class="form-group"></div>');
        this.emailGroup = $('<div class="form-group"></div>');

        this.userField = $('<input class="form-control" id="user" required></input>');
        this.passField = $('<input type="password" class="form-control" id="pass" required></input>');
        this.passCheckField = $('<input type="password" class="form-control" id="passCheck" required></input>');

        this.userLabel = $('<label for="user">Username</label>');
        this.passLabel = $('<label for="pass">Password</label>');
        this.passCheckLabel = $('<label for="passCheck">Confirm Password</label>');

        this.userFeedback = $('<div class="invalid-feedback"></div>');
        this.passFeedback = $('<div class="invalid-feedback"></div>');
        this.passCheckFeedback = $('<div class="invalid-feedback"></div>');

        this.submitButton = $('<button type="submit" class="btn btn-primary">Login</button>');

        this.submitButton.click(e => this.handleSubmit(e));

        this.html.append(
                $('<h3>New User Registration</h3>'),
                this.form.append(
                    this.userGroup.append(
                        this.userLabel,
                        this.userField,
                        this.userFeedback
                    ),
                    this.passGroup.append(
                        this.passLabel,
                        this.passField,
                        this.passFeedback
                    ),
                    this.passCheckGroup.append(
                        this.passCheckLabel,
                        this.passCheckField,
                        this.passCheckFeedback

                    ),
                    this.submitButton
                )
        );
    }

    async handleSubmit(e) {
        e.preventDefault();

        const user = this.userField.val();
        const pass = this.passField.val();
        const passCheck = this.passCheckField.val();

        this.userFeedback.html('');
        this.passFeedback.html('');
        this.passCheckFeedback.html('');



        if (!user) {
            this.userField.addClass('is-invalid');
            this.userFeedback.append($('<p>Please enter a username.</p>'));
        }
        else {
            this.userField.addClass('is-valid');
        }

        if (!pass) {
            this.passField.addClass('is-invalid');
            this.passFeedback.append($('<p>Please enter a password.</p>'));
        }
        else {
            this.passField.addClass('is-valid');
        }

        if (pass !== passCheck) {
            this.passCheckField.addClass('is-invalid');
            this.passCheckFeedback.append($('<p>Passwords must match.</p>'));
        }
        else {
            this.passCheckField.addClass('is-valid');
        }

        if (user && pass && passCheck) {
            if (pass === passCheck) {
                await User.createNewUser(user, pass);
                await startSession(user, pass);
                location.hash = '#dashboard';
            }
        }


    }
}

export {RegisterForm}