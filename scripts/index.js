import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
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

profileAddBtn.addEventListener("click", () => {
  openPopup(cardPopup);
  const cardFormValidator = new FormValidator(settings, cardPopupForm);
  cardFormValidator.disableButton();
  cardFormValidator.enableValidation();
});

profileEditBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  fillProfileInputs();
  const profileFormValidator = new FormValidator(settings, profilePopupForm);
  profileFormValidator.enableValidation();
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
