function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const buttonElement = formElement.querySelector(".popup__button");
  buttonElement.disabled = true;
  buttonElement.classList.add("popup__button_disabled");
  errorElement.textContent = errorMessage;
  inputElement.classList.add("popup__input_type_error");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove("popup__input_type_error");
}

function disableButton(formElement) {
  const buttonElement = formElement.querySelector(".popup__button");
  buttonElement.disabled = true;
  buttonElement.classList.add("popup__button_disabled");
}

function enableButton(formElement) {
  const buttonElement = formElement.querySelector(".popup__button");
  buttonElement.disabled = false;
  buttonElement.classList.remove("popup__button_disabled");
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    disableButton(formElement);
  } else {
    hideInputError(formElement, inputElement);
    if (formIsValid(formElement)) {
      enableButton(formElement);
    }
  }
}

function formIsValid(formElement) {
  const inputsList = Array.from(formElement.querySelectorAll(".popup__input"));
  return inputsList.every((inputElement) => {
    return inputElement.validity.valid;
  });
}

function setEventListeners(formElement) {
  const inputsList = Array.from(formElement.querySelectorAll(".popup__input"));

  inputsList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      evt.preventDefault();
      isValid(formElement, inputElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();
