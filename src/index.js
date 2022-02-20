import "./styles/index.css";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {
  profileInterest,
  profileName,
  profileAddBtn,
  profilePopupForm,
  profileEditBtn,
  cardPopupForm,
  fillProfileInputs,
  initialCards,
  settings,
} from "./utils.js";

// userInfo
const userInfo = new UserInfo("", "");

// elements section instance
const elementsSection = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, "#element", handleCardClick);
      const cardElement = card.getCard();
      elementsSection.addItem(cardElement);
    },
  },
  ".elements"
);
// to add markup to the dom
elementsSection.renderItems();

// card popup instance of the PopupWithForm class
const cardPopup = new PopupWithForm(".popup_type_card", handleCardFormSubmit);

// profile popup instance of the PopupWithForm class
const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);

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
  cardPopup.setEventListeners();
});

// add a click event listener for the edit button
profileEditBtn.addEventListener("click", () => {
  profilePopup.openPopup();
  fillProfileInputs();
  profilePopup.setEventListeners();
});

// card form submit handler
function handleCardFormSubmit(data) {
  const { title, image_link } = data;
  cardPopup.closePopup();
  const card = new Card(
    { name: title, link: image_link },
    "#element",
    handleCardClick
  );
  elementsSection.addItem(card.getCard());
}

// profile form submit handler
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data.name, data.hobby);
  const { userName, userJob } = userInfo.getUserInfo();

  profileName.textContent = userName;
  profileInterest.textContent = userJob;
  profilePopup.closePopup();
  fillProfileInputs();
}

// card click handler
function handleCardClick(src, name) {
  const cardImagePopup = new PopupWithImage(".popup_type_image");
  cardImagePopup.openPopup(src, name);
  cardImagePopup.setEventListeners();
}
