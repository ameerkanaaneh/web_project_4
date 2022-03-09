const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const profileInputName = document.querySelector(".popup__input_type_name");
const profileInputHobby = document.querySelector(".popup__input_type_hobby");

const profilePopupForm = document.querySelector(".popup__form_type_profile");
const cardPopupForm = document.querySelector(".popup__form_type_card");
const avatarPopupForm = document.querySelector(".popup__form_type_avatar");

const profileName = document.querySelector(".profile__name");
const profileInterest = document.querySelector(".profile__interest");

const profileOverlayContainer = document.querySelector(
  ".profile__overlay-container"
);

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// settings for validation
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export {
  profileInputName,
  profileInputHobby,
  cardPopupForm,
  profilePopupForm,
  initialCards,
  profileAddBtn,
  profileEditBtn,
  profileName,
  profileInterest,
  settings,
  profileOverlayContainer,
  avatarPopupForm,
};
