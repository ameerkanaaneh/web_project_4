const popup = document.querySelectorAll(".popup");
const profilePopup = popup[0];
const cardPopup = popup[1];

const popupCloseBtn = document.querySelectorAll(".popup__close");
const profilePopupCloseBtn = popupCloseBtn[0];
const CardPopupCloseBtn = popupCloseBtn[1];

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const inputs = Array.from(document.querySelectorAll(".popup__input"));
const profileInputs = inputs.slice(0, 2);
const cardInputs = inputs.slice(2);

const popupForm = document.querySelectorAll(".popup__form");
const profilePopupForm = popupForm[0];
const cardPopupForm = popupForm[1];

const profileName = document.querySelector(".profile__name");
const profileInterest = document.querySelector(".profile__interest");

const elementsSection = document.querySelector(".elements");

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
  appendElement(card.link, card.name);
});

function appendElement(url, name) {
  const elementTemplate = document.querySelector("#element").content;
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const imageElement = element.querySelector(".element__image");
  const nameElement = element
    .querySelector(".element__box")
    .querySelector(".element__name");

  imageElement.src = url;
  nameElement.textContent = name;
  imageElement.alt = name + " city";

  elementsSection.prepend(element);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup, inputs, value1 = "", value2 = "") {
  popup.classList.add("popup_opened");
  inputs[0].value = inputs === profileInputs ? value1.textContent : "";
  inputs[1].value = inputs === profileInputs ? value2.textContent : "";
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = profileInputs[0];
  let jobInput = profileInputs[1];

  let NameInputVal = nameInput.value;
  let jobInputVal = jobInput.value;

  profileName.textContent = NameInputVal;

  profileInterest.textContent = jobInputVal;

  closePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  let cardTitle = cardInputs[0].value;
  let cardUrl = cardInputs[1].value;

  appendElement(cardUrl, cardTitle);

  closePopup(cardPopup);
}

profileAddBtn.addEventListener("click", () => {
  openPopup(cardPopup, cardInputs);
});

cardPopupForm.addEventListener("submit", handleCardFormSubmit);

profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

profileEditBtn.addEventListener("click", () => {
  openPopup(profilePopup, profileInputs, profileName, profileInterest);
});

profilePopupCloseBtn.addEventListener("click", () => {
  closePopup(profilePopup);
});

CardPopupCloseBtn.addEventListener("click", () => {
  closePopup(cardPopup);
});
