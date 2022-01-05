const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
const imagePopup = document.querySelector(".popup_type_image");

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

initialCards.reverse().forEach((card) => {
  prependElement(card.link, card.name);
});

function createCard(url, name) {
  const elementTemplate = document.querySelector("#element").content;
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  const nameElement = element
    .querySelector(".element__box")
    .querySelector(".element__name");
  const deleteElement = element.querySelector(".element__delete-button");
  const likeButton = element.querySelector(".element__like");

  imageElement.addEventListener("click", (evt) => {
    evt.preventDefault();
    popupImageElement.src = evt.target.src;
    popupImageElement.alt = name;
    popupNameElement.textContent = name;
    openPopup(imagePopup);
  });

  likeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle("element__like_active");
  });

  deleteElement.addEventListener("click", (evt) => {
    evt.preventDefault();
    element.remove();
  });

  imageElement.src = url;
  nameElement.textContent = name;
  imageElement.alt = name;
  return element;
}

function prependElement(url, name) {
  const element = createCard(url, name);
  elementsSection.prepend(element);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
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

  prependElement(cardUrl, cardTitle);

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
