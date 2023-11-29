const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

function createCard(placeLink, placeName, removing) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = placeLink;
  cardElement.querySelector('.card__image').alt = placeName;
  cardElement.querySelector('.card__title').textContent = placeName;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removing(cardElement);
  });
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function renderCard(placeLink, placeName, removing) {
  const renderedCardElement = createCard(placeLink, placeName, removing);
  placesList.prepend(renderedCardElement);
}

initialCards.forEach(function(item) {
  renderCard(item.link, item.name, deleteCard);
});


