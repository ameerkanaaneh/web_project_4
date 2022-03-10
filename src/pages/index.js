import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import API from "./../components/API";
import {
  profileInputName,
  profileInputHobby,
  profileAddBtn,
  profilePopupForm,
  profileEditBtn,
  cardPopupForm,
  settings,
  profileOverlayContainer,
  avatarPopupForm,
} from "../utils/constants.js";

// API
const api = new API({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "82cfb778-0110-4074-beef-5e31af26dd47",
  },
});

// elements section instance
const elementsSection = new Section(
  {
    items: [],
    renderer: (cardItem) => {
      renderCard(cardItem);
    },
  },
  ".elements"
);

// userInfo
const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__interest",
  userAvatarSelector: ".profile__image",
});

const confirmDeletePopup = new PopupWithForm(
  ".popup_type_confirm",
  handleConfirmFormSubmit
);
confirmDeletePopup.setEventListeners();

// avatar popup
const avatarPopup = new PopupWithForm(
  ".popup_type_avatar",
  handleAvatarPictureSubmit
);
avatarPopup.setEventListeners();

// card with image popup instance
const cardImagePopup = new PopupWithImage(".popup_type_image");
cardImagePopup.setEventListeners();

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

// avatar form validator
const avatarFormValidator = new FormValidator(settings, avatarPopupForm);
avatarFormValidator.enableValidation();

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

// avatar form submit handler
function handleAvatarPictureSubmit(data) {
  const { url } = data;

  api
    .changeProfileAvatar(url)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res._id, res.avatar);
      avatarPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
}

// card form submit handler
function handleCardFormSubmit(data) {
  const { title, image_link } = data;

  // add a new card to the server
  api
    .addNewCard(title, image_link)
    .then((card) => {
      renderCard(card);
      cardPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => cardPopup.renderLoading(false));
}

// like click handler
function handleLikeClick(id, liked, updateCard, likeButton) {
  if (liked) {
    api
      .unlikeCard(id)
      .then((data) => {
        likeButton.classList.toggle("element__like_active");
        updateCard(data.likes.length);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .likeCard(id)
      .then((data) => {
        likeButton.classList.toggle("element__like_active");
        updateCard(data.likes.length);
      })
      .catch((err) => console.log(err));
  }
}

// profile form submit handler
function handleProfileFormSubmit(data) {
  const { name, hobby } = data;

  // upadte profile data in the server
  api
    .editProfileData(name, hobby)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res._id, res.avatar);
      profilePopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
}
// delete a card
function handleConfirmFormSubmit({}, element, id) {
  api
    .deleteCard(id)
    .then((result) => {
      element.remove();
      confirmDeletePopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => confirmDeletePopup.renderLoading(false));
}

// card click handler
function handleCardClick(src, name) {
  cardImagePopup.openPopup(src, name);
}

// open confirm popup
function handleDeleteIconClick(element, id) {
  confirmDeletePopup.setSubmitData(element, id);
  confirmDeletePopup.openPopup();
}

// rendering a card
function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#element",
    handleCardClick,
    handleDeleteIconClick,
    handleLikeClick,
    userInfo.getUserInfo().userId
  );
  const cardElement = card.getCard();
  elementsSection.addItem(cardElement);
}

// a function to fill the inputs after resetting the profile form
function fillProfileInputs() {
  const { userName, userJob } = userInfo.getUserInfo();
  profileInputName.value = userName;
  profileInputHobby.value = userJob;
}

profileOverlayContainer.addEventListener("click", () => {
  avatarPopup.openPopup();
  avatarFormValidator.disableButton();
});

Promise.all([api.loadUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // set userInfo from the server response
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData._id,
      userData.avatar
    );
    // set initialCards based on the server response
    elementsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
