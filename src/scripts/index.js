import '../pages/index.css';

import { initialCards } from './cards'

const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const cardsImage = document.querySelector('.card__image');



const popupCloseButton = document.querySelectorAll('.popup__close');

const popup = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');





const formElementForEditProfile = document.forms.editProfile; 
const nameInput = formElementForEditProfile.elements.name; 
const jobInput = formElementForEditProfile.elements.description;

const formElementForCreateCard = document.forms.newPlace; 
const plaseTitle = formElementForCreateCard.elements.placeName; 
const placeLink = formElementForCreateCard.elements.link; 


const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');




function createCard(objectFromArray, removing, liking, openingImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = objectFromArray.link;
  cardElement.querySelector('.card__image').alt = objectFromArray.name;
  cardElement.querySelector('.card__title').textContent = objectFromArray.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removing(cardElement);
  });
  placesList.addEventListener('click', liking);
  placesList.addEventListener ('click', openingImage);
  return cardElement;  
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCard(objectFromArray, removing, liking, openingImage) {
  const renderedCardElement = createCard(objectFromArray, removing, liking, openingImage);
  placesList.prepend(renderedCardElement);
}

initialCards.forEach(function(item) {
  renderCard(item, deleteCard, likeToggle, openImage);
});




// функция открытия попапа
function openModal(tengiblePopup) {
  tengiblePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscapeKey);
}

// открытие попапа по кнопке редактирования профиля
editButton.addEventListener('click', function () {
  openModal(popupTypeEdit);  
});

// открытие попапа по кнопке редактирования карточки
addButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});



// функция закрытия попапа
function closeModal() {
  const openedPopup = document.querySelector('.popup_is-opened'); // выбран текущий открытый попап
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscapeKey); 
}

// закрытие по клику на крестик
popupCloseButton.forEach(function(concreteButton) {
  concreteButton.addEventListener('click', function() {
    closeModal();
  }); 
});

// закрытие по клику на оверлей
popup.forEach(function(concreteOverlay) {
  concreteOverlay.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) { // "если элемент на который кликнули является самым нижним"
      closeModal();
    }
  });
});

// !!! поиск открытого попапа надо делать через условие if, чтобы уменьшить количество поисков по DOM
// закрытие по нажатию на Escape
function closeByEscapeKey (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}



// Формы

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  profileTitle.textContent  = nameInput.value;
  profileDescription.textContent  = jobInput.value;
  formElementForEditProfile.reset();
  closeModal();
}

// подтверждание формы редактирования профиля
formElementForEditProfile.addEventListener('submit', handleFormSubmit);

// Обработчик «отправки» формы добавления карточки
function newCardFormSubmit(evt) {
  evt.preventDefault(); 
  const newObj = {
    name: plaseTitle.value,
    link: placeLink.value,
  }
  renderCard(newObj, deleteCard); 
  formElementForCreateCard.reset();
  closeModal();
}

// подтверждание формы добавления карточки
formElementForCreateCard.addEventListener('submit', newCardFormSubmit);

// Лайк карточки
function likeToggle (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};



// открытие картинки
function openImage (evt) {      
  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(popupTypeImage);
  }
}

