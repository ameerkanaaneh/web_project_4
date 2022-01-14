function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}

function disableButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

function enableButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  buttonElement.disabled = false;
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function isValid(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function toggleSubmitBtnState(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    disableButton(formElement, config);
  } else {
    if (formIsValid(formElement, config)) {
      enableButton(formElement, config);
    }
  }
}

function formIsValid(formElement, config) {
  const inputsList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  return inputsList.every((inputElement) => {
    return inputElement.validity.valid;
  });
}

function setEventListeners(formElement, config) {
  const inputsList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      evt.preventDefault();
      toggleSubmitBtnState(formElement, inputElement, config);
      isValid(formElement, inputElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
