import '../pages/index.css';
import { initialCards } from '../cards';
import { content, createCard, deleteCard, likeToggle } from '../card';
import { openModal, closeModal, closeByClickOnOverlay } from '../modal';

const placeList = content.querySelector('.places__list')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formElementForEditProfile = document.forms.editProfile;
const formElementForCreateCard = document.forms.newPlace;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formElementForEditProfile.elements.name; 
const jobInput = formElementForEditProfile.elements.description;
const plaseTitle = formElementForCreateCard.elements.placeName; 
const placeLink = formElementForCreateCard.elements.link; 
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// функция добавления созданного элемента карточки ↓
function renderCard (objectFromArray, removing, liking, openingImage) {
  const renderedCardElement = createCard(objectFromArray, removing, liking, openingImage);
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
  }
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
initialCards.forEach(function(item) {
  renderCard(item, deleteCard, likeToggle, openImage);
});

// открытие попапа по кнопке редактирования профиля ↓
editButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent
  jobInput.value = profileDescription.textContent
  openModal(popupTypeEdit);  
});

// открытие попапа по кнопке редактирования карточки ↓
addButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// закрытие по клику на кнопку закрытия ↓
document.querySelectorAll('.popup__close').forEach(function(concreteButton) {
  concreteButton.addEventListener('click', function() {
    closeModal(document.querySelector('.popup_is-opened'));
  }); 
});

// закрытие по клику на оверлей ↓
document.querySelectorAll('.popup').forEach(function(concreteOverlay) {
  concreteOverlay.addEventListener('click', closeByClickOnOverlay);
});

// слушатели форм ↓
formElementForEditProfile.addEventListener('submit', submitToProfileForm);
formElementForCreateCard.addEventListener('submit', submitToNewCardForm);























// ПОКАЗАТЬ элемент ошибки
function showInputError (popupElement, inputElement, errorMessage) {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

// СКРЫТЬ элемент ошибки
function hideInputError (popupElement, inputElement) {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

// ПРОВЕРИТЬ валидность поля
function checkInputValidity (popupElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popupElement, inputElement);
  }
};

// УСТАНОВИТЬ слушатели на элементы формы
function setEventListeners (popupElement) {
  const inputList = Array.from(querySelectorAll(".popup__input"));
  console.log(inputList);
  const buttonElement = popupElement.querySelector(".popup__submit");

  // -чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(popupElement, inputElement); 
      
      // -чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// ПРОВЕРИТЬ наличие невалидных полей (возвращает: 
//          true при наличии невалидных полей и
//          false при их отсутсвии)
function hasInvalidInput (inputList)  {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// ПЕРЕКЛЮЧИТЬ состояние кнопки
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
  }
};

// ПЕРЕБРАТЬ все формы (чтобы установить слушатели)
// function enableValidation () {
//   const popupList = Array.from(document.querySelectorAll(".popup__form"));
//   popupList.forEach((popupElement) => {
//     popupElement.addEventListener("submit", function (evt) {
//       evt.preventDefault();
//     });

//     const fieldsetList = Array.from(popupElement.querySelectorAll(".form__set"));
//     fieldsetList.forEach((item) => {
//       setEventListeners(item);
//     });
//   });
// };

function enableValidation () {
  const inputList = document.querySelectorAll(".popup__input");
  inputList.forEach((item) => {
    // console.log(item);
    item.addEventListener("submit", function (evt) {
      evt.preventDefault();
      setEventListeners(item);
    });
    // evt.preventDefault();
    // setEventListeners(item);
   
  })
}




enableValidation();