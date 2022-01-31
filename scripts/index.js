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

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  _handleImageClick(evt) {
    evt.preventDefault();
    popupImageElement.src = evt.target.src;
    popupImageElement.alt = this._name;
    popupNameElement.textContent = this._name;
    openPopup(imagePopup);
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleLikeClick(evt) {
    evt.preventDefault();
    evt.target.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", this._handleImageClick);

    this._deleteElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleDeleteClick();
    });

    this._likeElement.addEventListener("click", this._handleLikeClick);
  }

  getCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__image");
    this._nameElement = this._element
      .querySelector(".element__box")
      .querySelector(".element__name");
    this._deleteElement = this._element.querySelector(
      ".element__delete-button"
    );
    this._likeElement = this._element.querySelector(".element__like");

    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    return this._element;
  }
}

initialCards.reverse().forEach((card) => {
  prependElement(card);
});

function prependElement(data) {
  const element = new Card(data, "#element");
  elementsSection.prepend(element.getCard());
}

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

  closePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardTitle = cardInputTitle.value;
  const cardUrl = cardInputLink.value;

  prependElement({ name: cardTitle, link: cardUrl });

  cardPopupForm.reset();

  closePopup(cardPopup);
}

profileAddBtn.addEventListener("click", () => {
  openPopup(cardPopup);
});

cardPopupForm.addEventListener("submit", handleCardFormSubmit);

profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

profileEditBtn.addEventListener("click", () => {
  openPopup(profilePopup);
  fillProfileInputs();
});

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
