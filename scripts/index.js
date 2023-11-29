const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

function createCard(objectFromArray, removing) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = objectFromArray.link;
  cardElement.querySelector('.card__image').alt = objectFromArray.name;
  cardElement.querySelector('.card__title').textContent = objectFromArray.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removing(cardElement);
  });
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCard(objectFromArray, removing) {
  const renderedCardElement = createCard(objectFromArray, removing);
  placesList.prepend(renderedCardElement);
}

initialCards.forEach(function(item) {
  renderCard(item, deleteCard);
});


