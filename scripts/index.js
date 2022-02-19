import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import {
  profileAddBtn,
  profilePopupForm,
  profileEditBtn,
  openPopup,
  cardPopup,
  profilePopup,
  cardInputTitle,
  cardInputLink,
  cardPopupForm,
  elementsSection,
  fillProfileInputs,
  initialCards,
  closePopup,
} from "./utils.js";

initialCards.reverse().forEach((card) => {
  prependElement(card);
});

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardFormValidator = new FormValidator(settings, cardPopupForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(settings, profilePopupForm);
profileFormValidator.enableValidation();

profileAddBtn.addEventListener("click", () => {
  openPopup(cardPopup);
  cardFormValidator.disableButton();
});

profileEditBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  fillProfileInputs();
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
