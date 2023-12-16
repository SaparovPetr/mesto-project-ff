const content = document.querySelector('.content');
const cardTemplate = document.querySelector('#card-template').content; 

// функция создания элемента карточки ↓
  function createCard (objectFromArray, removing, liking, openingImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = objectFromArray.link;
  cardElement.querySelector('.card__image').alt = objectFromArray.name;
  cardElement.querySelector('.card__title').textContent = objectFromArray.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removing(cardElement);
  });
  content.querySelector('.places__list').addEventListener('click', liking);
  content.querySelector('.places__list').addEventListener ('click', openingImage);
  return cardElement;  
}

// функция добавления созданного элемента карточки ↓
export function renderCard (objectFromArray, removing, liking, openingImage) {
  const renderedCardElement = createCard(objectFromArray, removing, liking, openingImage);
  content.querySelector('.places__list').prepend(renderedCardElement);
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


