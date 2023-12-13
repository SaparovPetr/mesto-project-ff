import '../pages/index.css';

import { initialCards } from './cards'

const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

let popupCloseButton = document.querySelectorAll('.popup__close');

const popup = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

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

function openModal(tengiblePopup) {
  tengiblePopup.classList.add('popup_is-opened');
}

// вызов открытия попапа 
editButton.addEventListener('click', function () {
  openModal(popupTypeEdit);
});

addButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});





// функция закрытия попапа
function closeModal() {
  const openedPopup = document.querySelector('.popup_is-opened'); // выбран текущий открытый попап
  openedPopup.classList.remove('popup_is-opened'); 
}

popupCloseButton.forEach(function(concreteButton) {
  concreteButton.addEventListener('click', function() {
    closeModal();
  }); 
});

popup.forEach(function(concreteOverlay) {
  concreteOverlay.addEventListener('click', (evt) => {
    if (evt.currentTarget === evt.target) { // "если элемент на который кликнули является самым нижним"
      closeModal();
    }
  });
});


// popup.forEach(function(concretePopup) {
//   concretePopup.addEventListener('keydown', function (evt) {
//     if (evt.key === 'Escape') {
//       closeModal();
//     }
//   });
// });