const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; 

// функция создания элемента карточки ↓
function createCard (outObject, removing, liking, openingImage, likesAmount) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = outObject.link;
  cardElement.querySelector('.card__image').alt = outObject.name;
  cardElement.querySelector('.card__title').textContent = outObject.name;  
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removing(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', liking);
  cardElement.querySelector('.card__like-counter').textContent = likesAmount;
  cardElement.querySelector('.card__like-button').addEventListener('click', () => toggleLikesAmount (cardElement, likesAmount));
  cardElement.querySelector('.card__image').addEventListener('click', () => openingImage(outObject.link, outObject.name));
  return cardElement;
}

// функция удаления элемента карточки ↓
function deleteCard(cardElement) {
  cardElement.remove();  
}

// функция переключения лайка на карточке ↓
function likeToggle (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

// функция скрытия иконки корзины на чужих карточках ↓
function hideTheTrashButton (ownerId, mineId) {
  if (ownerId !== mineId) {
    document.querySelector('.card__delete-button').classList.add('card__delete-button_hidden')
  }
}

// функция переключения количества лайков ↓
function toggleLikesAmount (cardElement, likesAmount) {
  if (cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
    cardElement.querySelector('.card__like-counter').textContent = likesAmount + 1;
    // location.reload();
  } else {
    cardElement.querySelector('.card__like-counter').textContent = likesAmount - 1;
    // location.reload();
  }
}

export {
  content, 
  createCard, 
  deleteCard, 
  likeToggle, 
  hideTheTrashButton
};
