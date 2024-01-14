import "../pages/index.css";
import { initialCards } from "../cards";
import { content, createCard, deleteCard, likeToggle } from "../card";
import { openModal, closeModal, closeByClickOnOverlay } from "../modal";

const placeList = content.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const formElementForEditProfile = document.forms.editProfile;
const formElementForCreateCard = document.forms.newPlace;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formElementForEditProfile.elements.name;
const jobInput = formElementForEditProfile.elements.description;
const plaseTitle = formElementForCreateCard.elements.placeName;
const placeLink = formElementForCreateCard.elements.link;
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// функция добавления созданного элемента карточки ↓
function renderCard(objectFromArray, removing, liking, openingImage) {
  const renderedCardElement = createCard(
    objectFromArray,
    removing,
    liking,
    openingImage
  );
  placeList.prepend(renderedCardElement);
}

// обработчик «отправки» формы редактирования профиля ↓
function submitToProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formElementForEditProfile.reset();
  closeModal(popupTypeEdit);
}

// обработчик «отправки» формы добавления карточки ↓
function submitToNewCardForm(evt) {
  evt.preventDefault();
  const newObj = {
    name: plaseTitle.value,
    link: placeLink.value,
  };
  renderCard(newObj, deleteCard, likeToggle, openImage);
  formElementForCreateCard.reset();
  closeModal(popupTypeNewCard);
}

// открытие картинки ↓
function openImage(outLink, outName) {
  popupImage.src = outLink;
  popupImage.alt = outName;
  popupCaption.textContent = outName;
  openModal(popupTypeImage);
}

// выведение карточек с данными из массива ↓
initialCards.forEach(function (item) {
  renderCard(item, deleteCard, likeToggle, openImage);
});

// открытие попапа по кнопке редактирования профиля ↓
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupTypeEdit);
});

// открытие попапа по кнопке редактирования карточки ↓
addButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});

// закрытие по клику на кнопку закрытия ↓
document.querySelectorAll(".popup__close").forEach(function (concreteButton) {
  concreteButton.addEventListener("click", function () {
    closeModal(document.querySelector(".popup_is-opened"));
  });
});

// закрытие по клику на оверлей ↓
document.querySelectorAll(".popup").forEach(function (concreteOverlay) {
  concreteOverlay.addEventListener("click", closeByClickOnOverlay);
});

// слушатели форм ↓
formElementForEditProfile.addEventListener("submit", submitToProfileForm);
formElementForCreateCard.addEventListener("submit", submitToNewCardForm);



























// проблемная

const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}






const showInputError = (formElement, inputElement, errorMessage, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${set.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`.${set.errorClass}`);
};

const hideInputError = (formElement, inputElement, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${set.inputErrorClass}`);
  errorElement.classList.remove(`.${set.errorClass}`);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
  }  
  
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, set) => {
  const inputList = Array.from(formElement.querySelectorAll(`${set.inputSelector}`));
  const buttonElement = formElement.querySelector(`${set.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, settingsObject);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, settingsObject);
    });
  });
};

const enableValidation = (set) => {
  const formList = Array.from(
    document.querySelectorAll(`${set.formSelector}`)
  );  
  formList.forEach((formElement) => {    
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingsObject);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, set) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${set.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${set.inactiveButtonClass}`);
  }
};







enableValidation(settingsObject); 


// .popup__form_editProfile
// .popup__form_newPlace
// concretePopup

// console.log(secondList.length)

// form.addEventListener("submit", function (evt) {
//   evt.preventDefault();
// });

// formInput.addEventListener("input", function () {
//   checkInputValidity(form, formInput);
// });
