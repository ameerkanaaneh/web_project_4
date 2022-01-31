export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  _disableButton() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _formIsValid() {
    const inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return inputsList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  _toggleSubmitBtnState() {
    if (this._formIsValid()) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }
  _setEventListeners() {
    const inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    inputsList.forEach((inputElement) => {
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


