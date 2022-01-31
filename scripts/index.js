initialCards.reverse().forEach((card) => {
  prependElement(card);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardTitle = cardInputTitle.value;
  const cardUrl = cardInputLink.value;

  prependElement({ name: cardTitle, link: cardUrl });

  cardPopupForm.reset();

  closePopup(cardPopup);
}

function prependElement(data) {
  const element = new Card(data, "#element");
  elementsSection.prepend(element.getCard());
}

cardPopupForm.addEventListener("submit", handleCardFormSubmit);

(function () {
  const settings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    const newFormValidator = new FormValidator(settings, formElement);

    newFormValidator.enableValidation();
  });
})();

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  cardPopup,
  cardInputTitle,
  cardInputLink,
  cardPopupForm,
  elementsSection,
  initialCards,
  closePopup,
} from "./utils.js";
