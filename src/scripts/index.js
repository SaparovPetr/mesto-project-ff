import "../pages/index.css";
import { content, createCard, deleteCard, likeToggle, hideTheTrashButton } from "./card";
import { openModal, closeModal, closeByClickOnOverlay, renderLoading } from "./modal";
import { validationConfig, enableValidation, clearValidation } from "./validation";
import { 
  getPersonality, 
  patchProfile, 
  getInitialCards, 
  addCardToServer, 
  removeCardFromServer,
  sendLikeToServer, 
  deleteLikeFromServer, 
  sendNewAvatarToServer
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

// запуск валидации ↓
enableValidation(validationConfig); 

// запуск асинхронного кода ↓
Promise.all([
  getPersonality(), 
  getInitialCards(),
])

.then((responseFromBothSources) => {  
  const objectWithMineProfileData = responseFromBothSources[0];
  const objectsWithCardsData = responseFromBothSources[1];
  profileTitle.textContent = objectWithMineProfileData.name;
  profileDescription.textContent = objectWithMineProfileData.about;
  profileAvatar.src = objectWithMineProfileData.avatar;

  objectsWithCardsData.forEach(function (item) {
    // начальный рендеринг ↓          
    renderCard(item, deleteCard, likeToggle, openImage, item.likes.length, objectWithMineProfileData._id, item._id);
    
    // выбор элемента карточки ↓ 
    const cardEl = document.querySelector('.card__like-counter').closest('.card');
    
    //  скрытие иконки корзины с чужих карточек ↓ 
    hideTheTrashButton (item.owner._id, objectWithMineProfileData._id);
    
    //  проверка наличия прежде поставленных лайков в отрисованных карточках ↓
    item.likes.forEach(function (objectOwner) {
      if (objectOwner._id === objectWithMineProfileData._id) {
        cardEl.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
    })

    //  слушатель клика иконки корзины для удаления с сервера ↓
    cardEl.querySelector('.card__delete-button').addEventListener('click', () => removeCardFromServer(item._id));
   
    //  слушатель переключения лайка ↓
    cardEl.querySelector('.card__like-button').addEventListener('click', function () {
      if (cardEl.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
        sendLikeToServer(item._id, cardEl);
      } else {        
        deleteLikeFromServer(item._id, cardEl);
      }
    });
  });
})

// экспорт для работоспособности функции очистки валидации при закрытии модалок по Esc и клику на оверлей ↓
export {
  formElementForEditProfile, 
  formElementForCreateCard, 
  formElementForChangeAvatar  
};