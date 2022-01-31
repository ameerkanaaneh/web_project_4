const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
const imagePopup = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

const popupCloseBtns = document.querySelectorAll(".popup__close");

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const profileInputName = document.querySelector(".popup__input_type_name");
const profileInputHobby = document.querySelector(".popup__input_type_hobby");

const cardInputTitle = document.querySelector(".popup__input_type_title");
const cardInputLink = document.querySelector(".popup__input_type_link");

const profilePopupForm = document.querySelector(".popup__form_type_profile");
const cardPopupForm = document.querySelector(".popup__form_type_card");

const profileName = document.querySelector(".profile__name");
const profileInterest = document.querySelector(".profile__interest");

const elementsSection = document.querySelector(".elements");

const popupImageElement = document.querySelector(".popup__card-image");
const popupNameElement = document.querySelector(".popup__name");

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

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEsc);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEsc);
}

function fillProfileInputs() {
  profileInputName.value = profileName.textContent;
  profileInputHobby.value = profileInterest.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputVal = profileInputName.value;
  const jobInputVal = profileInputHobby.value;

  profileName.textContent = nameInputVal;

  profileInterest.textContent = jobInputVal;
  profilePopupForm.reset();
  closePopup(profilePopup);
}

profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

popupCloseBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closePopup(btn.closest(".popup"));
  });
});

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    popups.forEach((popup) => {
      if (popup.classList.contains("popup_opened")) {
        closePopup(popup);
      }
    });
  }
}

export {
  profilePopup,
  cardPopup,
  imagePopup,
  popups,
  popupCloseBtns,
  profileEditBtn,
  profileAddBtn,
  profileInputName,
  profileInputHobby,
  cardInputTitle,
  cardInputLink,
  profilePopupForm,
  cardPopupForm,
  profileName,
  profileInterest,
  elementsSection,
  popupImageElement,
  popupNameElement,
  initialCards,
  closePopup,
  openPopup,
  fillProfileInputs,
};
