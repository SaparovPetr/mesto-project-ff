как в этом коде использовать метод promise.all для того, чтобы испльзовать в функции getInitialCards() данные, полученные в фукнции getPersonality()? 


import "../pages/index.css";
import { content, createCard, deleteCard, likeToggle } from "./card";
import { openModal, closeModal, closeByClickOnOverlay } from "./modal";
import { validationConfig, enableValidation, clearValidation } from "./validation";

const placeList = content.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
export const formElementForEditProfile = document.forms.editProfile;
export const formElementForCreateCard = document.forms.newPlace;

const profileAvatar = document.querySelector('.profile__avatar')
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const nameInput = formElementForEditProfile.elements.name;
const jobInput = formElementForEditProfile.elements.description;
const plaseTitle = formElementForCreateCard.elements.placeName;
const placeLink = formElementForCreateCard.elements.link;
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// функция добавления созданного элемента карточки ↓
function renderCard(objectFromArray, removing, liking, openingImage, likesAmount) {
  const renderedCardElement = createCard(
    objectFromArray,
    removing,
    liking,
    openingImage,
    likesAmount
  );
  placeList.prepend(renderedCardElement);
}

// обработчик «отправки» формы редактирования профиля ↓
function submitToProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formElementForEditProfile.reset();
  patchProfile(profileTitle.textContent, profileDescription.textContent);
  closeModal(popupTypeEdit);
  clearValidation (formElementForEditProfile, validationConfig); 
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
  addCardToServer(newObj.name, newObj.link)
  closeModal(popupTypeNewCard);
  clearValidation (formElementForCreateCard, validationConfig); 
}

// открытие картинки ↓
function openImage(outLink, outName) {
  popupImage.src = outLink;
  popupImage.alt = outName;
  popupCaption.textContent = outName;
  openModal(popupTypeImage);
}

// выведение карточек с данными из офлайн массива ↓
// initialCards.forEach(function (item) {
//   renderCard(item, deleteCard, likeToggle, openImage);
// });

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
    clearValidation (formElementForEditProfile, validationConfig); 
    clearValidation (formElementForCreateCard, validationConfig); 
  });
});

// закрытие по клику на оверлей ↓
document.querySelectorAll(".popup").forEach(function (concreteOverlay) {
  concreteOverlay.addEventListener("click", closeByClickOnOverlay);
});

// слушатели форм ↓
formElementForEditProfile.addEventListener("submit", submitToProfileForm);
formElementForCreateCard.addEventListener("submit", submitToNewCardForm);

// вызов кода валидации ↓
enableValidation(validationConfig); 





















const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '74fac8d8-4ad0-46e7-8b61-ccf40d749a5e',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}




///////////////////////////////////   Профиль
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// рендеринг профиля
function getPersonality() {
  fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  
  .then((res) => {
      if (res.ok) {
        return res.json();
      }  
      return Promise.reject(res.status)
    })
  
    .then((objectWithMineProfileData) => {
      console.log(objectWithMineProfileData);
      profileTitle.textContent = objectWithMineProfileData.name;
      profileDescription.textContent = objectWithMineProfileData.about;
      profileAvatar.src = objectWithMineProfileData.avatar;
    })
  
    .catch((err) => {
      console.log(`Ошибка: ${err}`); // выводим ошибку в консоль
    })
}
getPersonality();


// редактирование профиля
function patchProfile(newName, newDescription) {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  });
}



///////////////////////////////////   Карточки
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////


// список карточек
function getInitialCards() {
  fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
  })

  .then((res) => {
  if (res.ok) {
    return res.json();
  }  
  return Promise.reject(res.status)
  })

  .then((arrayWithCardsData) => {
    console.log(arrayWithCardsData);   
    // выведение карточек с данными из онлайн-массива ↓
    arrayWithCardsData.forEach(function (item) {           
    renderCard(item, deleteCard, likeToggle, openImage, item.likes.length);
    });     
  })


  .catch((err) => {
  console.log(`Ошибка: ${err}`); // вывожу ошибку в консоль - сделать верстку
  });
}

getInitialCards();









// добавление на сервер собственной карточки ↓
function addCardToServer(mineName, mineLink) {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: mineName,
      link: mineLink
    }),
    headers: config.headers
  })
}


















































