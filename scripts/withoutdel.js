const content = document.querySelector('.content');
const addButton = content.querySelector('.profile__add-button');
const placesList = content.querySelector('.places__list');


const cardsNamesOnly = initialCards.map(function (el) {
  return el.name;
});

const cardsLinksOnly = initialCards.map(function (el) {
  return el.link;
});

let placeName = cardsNamesOnly[0];
let placeImagine = cardsLinksOnly[0];



function addCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  
  /// удаление
 



  /// удаление

  placesList.append(cardElement);  
}



for (let i = 0; i <= 5; i = i + 1) {
  placeName = cardsNamesOnly[i];
  placeImagine = cardsLinksOnly[i];
  addCard(placeImagine, placeName);
}


// Понимаю, что кнопка задумана не для выведения дополнительных карточек, сделал по приколу. Потом уберу. 
addButton.addEventListener('click', function () {
  for (let i = 6; i <= 9; i = i + 1) {
    placeName = cardsNamesOnly[i];
    placeImagine = cardsLinksOnly[i];
    addCard(placeImagine, placeName);
  }
});




