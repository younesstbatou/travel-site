import $ from 'jquery';

class Modal {
  constructor(){
    this.OpenModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.CloseModalButton = $(".modal__close");
    this.events();
  }

  events(){
    // clicking the open modal button
    this.OpenModalButton.click(this.OpenModal.bind(this));

    // clicking the X close modal button
    this.CloseModalButton.click(this.CloseModal.bind(this));

    // pushes any key
    $(document).keyup(this.keyPressHandler.bind(this));

  }

  keyPressHandler(e) {
    if (e.keyCode == 27){
      this.CloseModal();
    }
  }

  OpenModal(){
    this.modal.addClass("modal--is-visible");
    return false;
  }

  CloseModal(){
    this.modal.removeClass("modal--is-visible");
  }

}

export default Modal;
