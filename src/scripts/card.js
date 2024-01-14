export const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; 

// функция создания элемента карточки ↓
  export function createCard (outObject, removing, liking, openingImage, likesAmount, mineId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = outObject.link;
  cardElement.querySelector('.card__image').alt = outObject.name;
  cardElement.querySelector('.card__title').textContent = outObject.name;  
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removing(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', liking);
  cardElement.querySelector('.card__like-counter').textContent = likesAmount;
  cardElement.querySelector('.card__image').addEventListener ('click', () => openingImage(outObject.link, outObject.name));
  if (outObject.owner._id !== mineId) {
    cardElement.querySelector('.card__delete-button').classList.add('card__delete-button_hidden')
  }
  return cardElement;
}

// функция удаления элемента карточки ↓
export function deleteCard(cardElement) {
  cardElement.remove();
}

// функция переключения лайка на карточке ↓
export function likeToggle (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
};