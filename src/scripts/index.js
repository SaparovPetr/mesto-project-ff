import '../pages/index.css';
import { initialCards } from './cards';
import { renderCard, deleteCard, likeToggle } from './card';
import { openModal, closeModal, closeByClickOnOverlay } from './modal';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formElementForEditProfile = document.forms.editProfile;
const formElementForCreateCard = document.forms.newPlace;

// выведение карточек с данными из массива ↓
initialCards.forEach(function(item) {
  renderCard(item, deleteCard, likeToggle, openImage);
});

// открытие попапа по кнопке редактирования профиля ↓
editButton.addEventListener('click', function () {
  openModal(popupTypeEdit);  
});

// открытие попапа по кнопке редактирования карточки ↓
addButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
});

// закрытие по клику на кнопку закрытия ↓
document.querySelectorAll('.popup__close').forEach(function(concreteButton) {
  concreteButton.addEventListener('click', function() {
    closeModal();
  }); 
});

// закрытие по клику на оверлей ↓
document.querySelectorAll('.popup').forEach(function(concreteOverlay) {
  concreteOverlay.addEventListener('click', closeByClickOnOverlay);
});

// Обработчик «отправки» формы редактирования профиля ↓
function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const nameInput = formElementForEditProfile.elements.name; 
  const jobInput = formElementForEditProfile.elements.description;
  profileTitle.textContent  = nameInput.value;
  profileDescription.textContent  = jobInput.value;
  formElementForEditProfile.reset();
  closeModal();
}

// Обработчик «отправки» формы добавления карточки ↓
function newCardFormSubmit(evt) {
  evt.preventDefault(); 
  const plaseTitle = formElementForCreateCard.elements.placeName; 
  const placeLink = formElementForCreateCard.elements.link; 
  const newObj = {
    name: plaseTitle.value,
    link: placeLink.value,
  }
  renderCard(newObj, deleteCard); 
  formElementForCreateCard.reset();
  closeModal();
}

// слушатели форм ↓
formElementForEditProfile.addEventListener('submit', handleFormSubmit);
formElementForCreateCard.addEventListener('submit', newCardFormSubmit);

// открытие картинки ↓
function openImage (evt) {      
  if (evt.target.classList.contains('card__image')) {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(popupTypeImage);
  }
}