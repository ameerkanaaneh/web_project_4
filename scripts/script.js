const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close");
const profileEditBtn = document.querySelector(".profile__edit-button");
const inputs = document.querySelectorAll(".popup__input");
const popupForm = document.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileInterest = document.querySelector(".profile__interest");

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
const elementsSection = document.querySelector(".elements");

console.log(elementsSection);

initialCards.forEach((card) => {
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

  elementsSection.append(element);
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openPopup() {
  popup.classList.add("popup_opened");
  inputs[0].value = profileName.textContent;
  inputs[1].value = profileInterest.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = inputs[0];
  let jobInput = inputs[1];

  let NameInputVal = nameInput.value;
  let jobInputVal = jobInput.value;

  profileName.textContent = NameInputVal;

  profileInterest.textContent = jobInputVal;

  closePopup();
}
popupForm.addEventListener("submit", handleProfileFormSubmit);

profileEditBtn.addEventListener("click", openPopup);

popupCloseBtn.addEventListener("click", closePopup);
