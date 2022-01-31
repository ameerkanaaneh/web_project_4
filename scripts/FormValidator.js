export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  disableButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _formIsValid() {
    console.log(this._inputsList);
    return this._inputsList.every((inputElement) => {
      return inputElement.validity.valid && inputElement.value !== "";
    });
  }

  _toggleSubmitBtnState() {
    if (this._formIsValid()) {
      this._enableButton();
    } else {
      this.disableButton();
    }
  }
  _setEventListeners() {
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        evt.preventDefault();
        this._toggleSubmitBtnState();
        this._isValid(inputElement);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
