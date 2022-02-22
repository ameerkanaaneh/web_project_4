import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileInputName,
  profileInputHobby,
  profileAddBtn,
  profilePopupForm,
  profileEditBtn,
  cardPopupForm,
  initialCards,
  settings,
} from "../utils/constants.js";

// userInfo
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__interest",
});

// card with image popup instance
const cardImagePopup = new PopupWithImage(".popup_type_image");
cardImagePopup.setEventListeners();

// elements section instance
const elementsSection = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      renderCard(cardItem);
    },
  },
  ".elements"
);
// to add markup to the dom
elementsSection.renderItems();

// card popup instance of the PopupWithForm class
const cardPopup = new PopupWithForm(".popup_type_card", handleCardFormSubmit);
cardPopup.setEventListeners();

// profile popup instance of the PopupWithForm class
const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

// card form validator
const cardFormValidator = new FormValidator(settings, cardPopupForm);
cardFormValidator.enableValidation();

// profile form validator
const profileFormValidator = new FormValidator(settings, profilePopupForm);
profileFormValidator.enableValidation();

// add a click event listener for the add button
profileAddBtn.addEventListener("click", () => {
  cardPopup.openPopup();
  cardFormValidator.disableButton();
});

// add a click event listener for the edit button
profileEditBtn.addEventListener("click", () => {
  profilePopup.openPopup();
  fillProfileInputs();
});

// card form submit handler
function handleCardFormSubmit(data) {
  const { title, image_link } = data;
  cardPopup.closePopup();
  renderCard({ name: title, link: image_link });
}

// profile form submit handler
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data.name, data.hobby);
  profilePopup.closePopup();
}

// card click handler
function handleCardClick(src, name) {
  cardImagePopup.openPopup(src, name);
}

// rendering a card
function renderCard(cardData) {
  const card = new Card(cardData, "#element", handleCardClick);
  const cardElement = card.getCard();
  elementsSection.addItem(cardElement);
}

// a function to fill the inputs after resetting the profile form
function fillProfileInputs() {
  const { userName, userJob } = userInfo.getUserInfo();
  profileInputName.value = userName;
  profileInputHobby.value = userJob;
}
