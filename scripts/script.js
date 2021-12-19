let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector(".popup__close");
let profileEditBtn = document.querySelector(".profile__edit-button");
let inputs = document.querySelectorAll(".popup__input");
let popupForm = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileInterest = document.querySelector(".profile__interest");

profileEditBtn.addEventListener("click", openPopup);

popupCloseBtn.addEventListener("click", closePopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}

function openPopup() {
  popup.classList.add("popup_opened");
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
