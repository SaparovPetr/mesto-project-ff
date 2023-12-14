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

// закрытие по нажатию на Escape
function closeByEscapeKey (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}


// Формы
const formElement = document.forms.edit-profile; // Воспользуйтесь методом querySelector()
const nameInput = formElement.elements.name; // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.elements.description;// Воспользуйтесь инструментом .querySelector()





// почему возникает ошибка Uncaught ReferenceError: profile is not defined ?
