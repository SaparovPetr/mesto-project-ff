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





















const popupElement = document.querySelector('.popup__form');
const inputElement = popupElement.querySelector('.popup__input');
// Выбираем элемент ошибки на основе уникального класса 
// const popupError = popupElement.querySelector(`.${popupInput.id}-error`);





// Функция, которая добавляет класс с ошибкой
const showInputError = (popupElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};


// Функция, которая удаляет класс с ошибкой
const hideInputError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
    // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  // Очистим ошибку
  errorElement.textContent = '';
};





// Функция, которая проверяет валидность поля
const isValid = (popupElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(popupElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(popupElement, inputElement);
  }
};

// Вызовем функцию isValid на каждый ввод символа
inputElement.addEventListener('input', isValid); 
