

class Modal {
    constructor(title) {

        this.modal = $(`<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true"></div>`);
        this.dialogue = $('<div class="modal-dialog"></div>');
        this.header = $('<div class="modal-header"></div>');
        this.content = $('<div class="modal-content"></div>');

        this.title = $(`<h5 class="modal-title" id="modalTitle">${title}</h5>`);
        this.body = $(`<div class="modal-body"></div>`);
        this.footer = $(`<div class="modal-footer"></div>`);
        this.closeButton = $(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`);

    
        this.modal.html(
            this.dialogue.html(
                this.content.append(
                    this.content.append(
                        this.header.html(
                            this.title
                        ),
                        this.body,
                        this.footer.html(
                            this.closeButton
                        )
                    )
                )
            )
        );

        $('#app').prepend(this.modal);

        // Close modal on back button 
        $(window).on('popstate', function() {
            $('.modal').modal('hide');
            $( ".modal-backdrop" ).remove();
            $( ".in" ).remove();
        });

        
    }

    setTitle(title) {
        this.title.html(title);
    }

    setBody(body) {
        this.body.html(body);
    }

    setFooter(footer) {
        this.footer.append(footer, this.closeButton);
    }

    toggle() {
        $('#myModal').modal('toggle')
    }
}

export {Modal}