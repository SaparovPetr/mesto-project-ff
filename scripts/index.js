const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const cardsNamesOnly = initialCards.map(function (el) {
  return el.name;
});
const cardsLinksOnly = initialCards.map(function (el) {
  return el.link;
});

function addCard(placeLink, placeName, removing) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = placeLink;
  cardElement.querySelector('.card__image').alt = placeName;
  cardElement.querySelector('.card__title').textContent = placeName;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    removing(cardElement);
  });
  placesList.append(cardElement);  
}

function deleteCard(cardElement) {
  cardElement.remove();
}

for (let i = 0; i < 6; i++)  {
  addCard(cardsLinksOnly[i], cardsNamesOnly[i], deleteCard);
}
