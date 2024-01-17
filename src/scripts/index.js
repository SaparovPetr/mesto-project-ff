import "../pages/index.css";
// import { initialCards } from "./cards";
import { content, createCard, deleteCard, likeToggle, hideTheTrashButton } from "./card";
import { openModal, closeModal, closeByClickOnOverlay } from "./modal";
import { validationConfig, enableValidation, clearValidation } from "./validation";

const placeList = content.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_change-avatar");
export const formElementForEditProfile = document.forms.editProfile;
export const formElementForCreateCard = document.forms.newPlace;
export const formElementForChangeAvatar = document.forms.changeAvatar;
const profileAvatar = document.querySelector('.profile__avatar')
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = formElementForEditProfile.elements.name;
const jobInput = formElementForEditProfile.elements.description;
const plaseTitle = formElementForCreateCard.elements.placeName;
const placeLink = formElementForCreateCard.elements.link;
const avatarInput = formElementForChangeAvatar.elements.URL;
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

// обработчик отправки формы редактирования профиля ↓
function submitToProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  formElementForEditProfile.reset();
  patchProfile(profileTitle.textContent, profileDescription.textContent);
  renderLoading (true);

  closeModal(popupTypeEdit);
  clearValidation (formElementForEditProfile, validationConfig); 
}

// обработчик отправки формы добавления карточки ↓
function submitToNewCardForm(evt) {
  evt.preventDefault();
  const newObj = {
    name: plaseTitle.value,
    link: placeLink.value,
  };
  renderCard(newObj, deleteCard, likeToggle, openImage, 0);
  formElementForCreateCard.reset();
  addCardToServer(newObj.name, newObj.link)
  renderLoading (true);

  closeModal(popupTypeNewCard);
  clearValidation (formElementForCreateCard, validationConfig); 
}


// обработчик отправки формы смены аватара ↓
function submitToAvatarForm(evt) {
  evt.preventDefault();
  profileAvatar.src = avatarInput.value;
  sendNewAvatarToServer(avatarInput.value);

  renderLoading (true);
  formElementForChangeAvatar.reset();
  closeModal(popupTypeAvatar);
  clearValidation (formElementForChangeAvatar, validationConfig);
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
  renderLoading (false);
});

// открытие попапа по кнопке редактирования карточки ↓
addButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
  renderLoading (false);
});


// открытие попапа по кнопке редактирования аватара ↓
avatarButton.addEventListener("click", function () {
  openModal(popupTypeAvatar);
  renderLoading (false);
});


// закрытие по клику на кнопку закрытия ↓
document.querySelectorAll(".popup__close").forEach(function (concreteButton) {
  concreteButton.addEventListener("click", function () {
    closeModal(document.querySelector(".popup_is-opened"));
    clearValidation (formElementForEditProfile, validationConfig); 
    clearValidation (formElementForCreateCard, validationConfig); 
    clearValidation (formElementForChangeAvatar, validationConfig); 
  });
});

// закрытие по клику на оверлей ↓
document.querySelectorAll(".popup").forEach(function (concreteOverlay) {
  concreteOverlay.addEventListener("click", closeByClickOnOverlay);
});

// слушатели форм ↓
formElementForEditProfile.addEventListener("submit", submitToProfileForm);
formElementForCreateCard.addEventListener("submit", submitToNewCardForm);
formElementForChangeAvatar.addEventListener("submit", submitToAvatarForm);

// вызов кода валидации ↓
enableValidation(validationConfig); 





















const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '74fac8d8-4ad0-46e7-8b61-ccf40d749a5e',
    'Content-Type': 'application/json; charset=UTF-8'
  }
}






//             Профиль
///////////////////////////////////   
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

// рендеринг профиля
function getPersonality() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка: ${err}`); // вывожу ошибку в консоль - сделать верстку
  });
}

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



//                Карточки
///////////////////////////////////   
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////


// получение списка карточек
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка: ${err}`); // вывожу ошибку в консоль - сделать верстку
  }); 
}


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

// удаление собственной карточки с сервера ↓
function removeCardFromServer(concreteCardId) {
  fetch(`${config.baseUrl}/cards/${concreteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}




Promise.all([getPersonality(), getInitialCards()])

.then((responseFromBothSources) => {  
  const objectWithMineProfileData = responseFromBothSources[0];
  const arrayWithCardsData = responseFromBothSources[1];
  
  // не забыть убрать:
  console.log(objectWithMineProfileData)
  console.log(arrayWithCardsData)

  profileTitle.textContent = objectWithMineProfileData.name;
  profileDescription.textContent = objectWithMineProfileData.about;
  profileAvatar.src = objectWithMineProfileData.avatar;

  arrayWithCardsData.forEach(function (item) {           
    renderCard(item, deleteCard, likeToggle, openImage, item.likes.length, objectWithMineProfileData._id, item._id);
    hideTheTrashButton (item.owner._id, objectWithMineProfileData._id);
    document.querySelector('.card__delete-button').addEventListener('click', () => removeCardFromServer(item._id));

    document.querySelector('.card__like-button').addEventListener('click', function () {
      sendLikeToServer(item._id);  
    })   
    
    item.likes.forEach(function (authorOfObj) {
      if (authorOfObj._id === objectWithMineProfileData._id) {
        document.querySelector('.card__like-button').classList.add('card__like-button_is-active')
      }
    })
    
    document.querySelectorAll('.card__like-button_is-active').forEach(function (heart) {
      heart.addEventListener('click', function () {
        deleteLikeFromServer(item._id); 
      })
    })

  });
})



// ф отправки лайка на сервер
function sendLikeToServer(concreteCardId) {
  fetch(`${config.baseUrl}/cards/likes/${concreteCardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

// ф удаления лайка с сервера
function deleteLikeFromServer(concreteCardId) {
  fetch(`${config.baseUrl}/cards/likes/${concreteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}


// ф обновления ссылки на аватар на сервере
function sendNewAvatarToServer(linkToNewAvatar) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkToNewAvatar      
    })
  });
}


// функция демонстрирования лодера ↓
function renderLoading (isLoading) {
  if (isLoading) {
    document.querySelectorAll('.popup__button').forEach(function (eachSubmitButton) {
      eachSubmitButton.textContent = 'Сохранение...';
    })
  } else {    
    document.querySelectorAll('.popup__button').forEach(function (eachSubmitButton) {
      eachSubmitButton.textContent = 'Сохранить';
    })
  }
}
