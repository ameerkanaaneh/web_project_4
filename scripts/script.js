const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__close");
const profileEditBtn = document.querySelector(".profile__edit-button");
const inputs = document.querySelectorAll(".popup__input");
const popupForm = document.querySelector(".popup__container");
const profileName = document.querySelector(".profile__name");
const profileInterest = document.querySelector(".profile__interest");

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
