export const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; 

// функция создания элемента карточки ↓
  export function createCard (outObject, removing, liking, openingImage, likesAmount) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = outObject.link;
  cardElement.querySelector('.card__image').alt = outObject.name;
  cardElement.querySelector('.card__title').textContent = outObject.name;  
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removing(cardElement));
  cardElement.querySelector('.card__like-button').addEventListener('click', liking);
  cardElement.querySelector('.card__like-counter').textContent = likesAmount;
  
  
  
  
  
  
  cardElement.querySelector('.card__like-button').addEventListener('click', () => increaseLikesAmount(cardElement, likesAmount));
    // cardElement.querySelector('.card__like-button_is-active').addEventListener('click', function () {
  //   cardElement.querySelector('.card__like-counter').textContent = likesAmount - 1;
  // })

  // cardElement.querySelector('.card__like-button_is-active').addEventListener('click', function () {
  //     cardElement.querySelector('.card__like-counter').textContent = likesAmount - 1;
  //   })

  // if (cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')) {
  //   cardElement.querySelector('.card__like-button').addEventListener('click', function () {
  //     cardElement.querySelector('.card__like-counter').textContent = likesAmount - 1;
  //   })
  // }


  


  
  cardElement.querySelector('.card__image').addEventListener ('click', () => openingImage(outObject.link, outObject.name));
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

// функция скрытия иконки корзины на чужих карточках ↓
export function hideTheTrashButton (ownerId, mineId) {
  if (ownerId !== mineId) {
    document.querySelector('.card__delete-button').classList.add('card__delete-button_hidden')
  }
}





// ф увеличения количества лайков
function increaseLikesAmount (cardElement, likesAmount) {
  cardElement.querySelector('.card__like-counter').textContent = likesAmount + 1;
}

// ф уменьшения количества лайков
// function reduceLikesAmount (cardElement, likesAmount) {
//   cardElement.querySelector('.card__like-counter').textContent = likesAmount - 1;
// }









