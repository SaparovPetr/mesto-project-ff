import '../pages/index.css';

import { initialCards } from './cards'





const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelector('.popup__close');
const popupContent = document.querySelector('.popup__content');


function createCard(objectFromArray, removing) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = objectFromArray.link;
  cardElement.querySelector('.card__image').alt = objectFromArray.name;
  cardElement.querySelector('.card__title').textContent = objectFromArray.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removing(cardElement);
  });
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCard(objectFromArray, removing) {
  const renderedCardElement = createCard(objectFromArray, removing);
  placesList.prepend(renderedCardElement);
}

initialCards.forEach(function(item) {
  renderCard(item, deleteCard);
});



// функция открытия попапа

function openModal() {
  popup.classList.add('popup_is-opened');
}

// вызов открытия попапа
editButton.addEventListener('click', openModal);
// addButton.addEventListener('click', openModal);


// функция закрытия попапа
function closeModal() {
  popup.classList.remove('popup_is-opened');
}

// вызов закрытия попапа
popupCloseButton.addEventListener('click', closeModal);
popup.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) { // "если элемент на который кликнули является самым нижним"
    closeModal();
  }
})

