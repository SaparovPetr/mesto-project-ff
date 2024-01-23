import "../pages/index.css";
import { content, createCard, deleteCard, changeLikeState, hideTheTrashButtonIfRequired, showMineLike } from "./card";
import { openModal, closeModal, closeByClickOnOverlay, renderLoading } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import { validationConfig } from "./validationConfig";
import { 
  getPersonality, 
  patchProfile, 
  getInitialCards, 
  addCardToServer, 
  sendNewAvatarToServer,
  handleResponse
} from "./api";

const placeList = content.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__image");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_change-avatar");
const formElementForEditProfile = document.forms.editProfile;
const formElementForCreateCard = document.forms.newPlace;
const formElementForChangeAvatar = document.forms.changeAvatar;
const nameInput = formElementForEditProfile.elements.name;
const jobInput = formElementForEditProfile.elements.description;
const plaseTitle = formElementForCreateCard.elements.placeName;
const placeLink = formElementForCreateCard.elements.link;
const avatarInput = formElementForChangeAvatar.elements.URL;
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// функция добавления созданного элемента карточки ↓
function renderCard(objectFromArray, removing, liking, openingImage, likesAmount, cardId) {
  const renderedCardElement = createCard(
    objectFromArray,
    removing,
    liking,
    openingImage,
    likesAmount,
    cardId
  );
  placeList.prepend(renderedCardElement);
}

// обработчик отправки формы редактирования профиля ↓
function submitToProfileForm(evt) {
  evt.preventDefault();
  patchProfile(nameInput.value, jobInput.value)
  .then((res) => handleResponse(res))
  .then ((objectAfterProfileEdition) => {
    document.querySelector(".profile__title").textContent = objectAfterProfileEdition.name;
    document.querySelector(".profile__description").textContent = objectAfterProfileEdition.about; 
  })
  .catch((err) => {
    console.log(`Ошибка редактирования профиля: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  });
  renderLoading (true, popupTypeEdit);
  formElementForEditProfile.reset();
  closeModal(popupTypeEdit);
  clearValidation (formElementForEditProfile); 
}

// обработчик отправки формы добавления карточки ↓
function submitToNewCardForm(evt) {
  evt.preventDefault();
  const newObj = {
    name: plaseTitle.value,
    link: placeLink.value,
  };
  addCardToServer(newObj.name, newObj.link)
  .then((res) => handleResponse(res))
  .then ((objectAfterCardCreation) => {
   renderCard(objectAfterCardCreation, deleteCard, changeLikeState, openImage, objectAfterCardCreation.likes.length, objectAfterCardCreation._id);
  })
  .catch((err) => {
    console.log(`Ошибка добавления на сервер собственной карточки: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  });
  formElementForCreateCard.reset();  
  renderLoading (true, popupTypeNewCard);
  closeModal(popupTypeNewCard);
  clearValidation (formElementForCreateCard); 
}

// обработчик отправки формы смены аватара ↓
function submitToAvatarForm(evt) {
  evt.preventDefault();
  sendNewAvatarToServer(avatarInput.value)
  .then((res) => handleResponse(res))
  .then ((objectAfterAvatarEdition) => {
    console.log(objectAfterAvatarEdition)
    document.querySelector('.profile__avatar').src = objectAfterAvatarEdition.avatar;
  })
  .catch((err) => {
    console.log(`Ошибка обновления аватара: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  });
  renderLoading (true, popupTypeAvatar);
  formElementForChangeAvatar.reset();
  closeModal(popupTypeAvatar);
  clearValidation (formElementForChangeAvatar);
}

// открытие картинки ↓
function openImage(outLink, outName) {
  popupImage.src = outLink;
  popupImage.alt = outName;
  popupCaption.textContent = outName;
  openModal(popupTypeImage);
}

// открытие попапа по кнопке редактирования профиля ↓
editButton.addEventListener("click", function () {
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  openModal(popupTypeEdit);
  renderLoading (false, popupTypeEdit);
});

// открытие попапа по кнопке редактирования карточки ↓
addButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
  renderLoading (false, popupTypeNewCard);
});

// открытие попапа по кнопке редактирования аватара ↓
avatarButton.addEventListener("click", function () {
  openModal(popupTypeAvatar);
  renderLoading (false, popupTypeAvatar);
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
formElementForChangeAvatar.addEventListener("submit", submitToAvatarForm);

// запуск валидации ↓
enableValidation(validationConfig); 

// запуск асинхронного кода ↓
Promise.all([
  getPersonality()
    .then((res) => handleResponse(res))
    .catch((err) => {console.log(`Ошибка рендеринга профиля: ${err}`)}), // сделать верстку модалки
  getInitialCards()
    .then((res) => handleResponse(res))
    .catch((err) => {console.log(`Ошибка получения списка карточек: ${err}`)}) // сделать верстку модалки
])

.then(([objectWithMineProfileData, objectsWithCardsData]) => { 
  document.querySelector(".profile__title").textContent = objectWithMineProfileData.name;
  document.querySelector(".profile__description").textContent = objectWithMineProfileData.about;
  document.querySelector('.profile__avatar').src = objectWithMineProfileData.avatar;

  objectsWithCardsData.forEach(function (item) {
    // начальный рендеринг карточки ↓          
    renderCard(item, deleteCard, changeLikeState, openImage, item.likes.length, item._id);
    
    // выбор элемента карточки ↓ 
    const cardEl = document.querySelector('.card__like-counter').closest('.card');
    
     // выбор элемента кнопки удаления ↓ 
    const trashButton = cardEl.querySelector('.card__delete-button');

    //  скрытие кнопки удаления с чужих карточек ↓ 
    hideTheTrashButtonIfRequired (item.owner._id, objectWithMineProfileData._id, trashButton);
    
    //  проверка наличия прежде поставленного лайка в отрисованной карточке ↓
    showMineLike(item.likes, objectWithMineProfileData._id, cardEl);
  })
})



    // Если вы не против, мне бы не хотелось вызывать функции 
    // hideTheTrashButtonIfRequired и showMineLike в createCard, 
    // поскольку они же все равно ничего не сделают с карточкой при ее создании через сабмит, 
    // а чтение createCard мне через полгода усложнят))) 
    // Но если это важно, я, разумеется, все переделаю ;)
    
    // PS. 
    // Спасибо вам и вашим коллегам за ревью! Меня впечатляет его детальность. 
    // Лично мне очень помогли ваши комментарии в понимании теории курса и того бардака, что я тут развел))