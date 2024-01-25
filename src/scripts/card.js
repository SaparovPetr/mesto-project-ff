import { 
  removeCardFromServer,
  deleteLikeFromServer, 
  sendLikeToServer
} from "./api";

const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; 

// ф. создания элемента карточки ↓
function createCard (outObject, removing, liking, openingImage, likesAmount, cardId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = outObject.link;
  cardElement.querySelector('.card__image').alt = outObject.name;
  cardElement.querySelector('.card__title').textContent = outObject.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removing(cardElement, cardId));
  const likeCounter = cardElement.querySelector('.card__like-counter');
  likeCounter.textContent = likesAmount;
  cardElement.querySelector('.card__like-button').addEventListener('click',(evt) => {
    const isLiked = cardElement.querySelector('.card__like-button').classList.contains('card__like-button_is-active')
    liking(cardId, isLiked, likeCounter, evt)
  });
  cardElement.querySelector('.card__image').addEventListener('click', () => openingImage(outObject.link, outObject.name));
  return cardElement;
}

// ф. переключения лайка на карточке ↓
function changeLikeState (cardId, isLiked, likeCounter, evt) {
  const methodOfInterractionWithServer = isLiked ? deleteLikeFromServer : sendLikeToServer;
  methodOfInterractionWithServer(cardId) 
  .then((res) => {
    if (evt.target.classList.contains('card__like-button')) {
      evt.target.classList.toggle('card__like-button_is-active');    
    }
    likeCounter.textContent = res.likes.length; 
  })
  .catch(err => console.log(`Ошибка обработки кнопки лайка: ${err}`));
}

// ф. удаления элемента карточки ↓
function deleteCard(cardElement, cardId) {
  removeCardFromServer(cardId)
  .catch((err) => {
    console.log(`Ошибка удаления собственной карточки с сервера: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
  cardElement.remove();
}

// ф. скрытия иконки корзины на чужой карточке ↓
function hideTheTrashButtonIfRequired (ownerId, mineId, cardsButton) {
  if (ownerId !== mineId) {
    cardsButton.classList.add('card__delete-button_hidden')
  }
}

//  ф. проверки наличия в карточке собственного лайка ↓
function showMineLike (arreyWithLikes, mineId, concreteCard) {  
  if (arreyWithLikes.some(likeOwner => likeOwner._id === mineId)) {
    concreteCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
  }  
}

export {
  content, 
  createCard, 
  deleteCard, 
  changeLikeState, 
  hideTheTrashButtonIfRequired,
  showMineLike
};
