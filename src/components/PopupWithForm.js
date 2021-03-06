import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._buttonValue = this._popup.querySelector(".popup__button").value;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._button = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    this._formValues = {};

    // Add the values of the fields to this object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // Return the values object
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      // call handleFormSubmit and pass the result of getInputValues()
      evt.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues(), this._element, this._id);
    });
  }

  setSubmitData(element, id) {
    this._element = element;
    this._id = id;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.value = "Saving...";
    } else {
      this._button.value = this._buttonValue;
    }
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
