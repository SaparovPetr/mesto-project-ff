// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const content = document.querySelector('.content');

const addButton = content.querySelector('.profile__add-button');

const placesList = content.querySelector('.places__list');




// Эта функция -> добавляет запись при ее вызове:
// записывает содержимое тега темплейт в переменную,
// создает элемент плейлиста и клонирует его (?) 
// наполняет элемент плейлиста содержимым, введенным в .song__artist
// наполняет элемент плейлиста содержимым, введенным в .song__title

// запускает при клике функцию, подставляющую и убирающиую класс .song__like_active в дополнение к классу .song__like
// отображает сформированный элемент плейлиста последним в блоке с классом .songs-container

// name, link

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.


 
  const cardDeleteButton = document.querySelector('.card__delete-button'); 
  
  cardDeleteButton.addEventListener('click', function () {
    deleteCard();  
  });

  // cardElement.querySelector('.song__artist').textContent = artistValue;
 
  // songElement.querySelector('.song__title').textContent = titleValue;
  
  // songElement.querySelector('.song__like').addEventListener('click', function (evt) {
  //   evt.target.classList.toggle('song__like_active'); 
  // });
  
  placesList.append(cardElement);  
}

function deleteCard () {
  const cardTemplate = document.querySelector('#card-template').content;
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  placesList.remove(cardElement);
};


addCard(initialCards[0]);
addCard(initialCards[1]);



addButton.addEventListener('click', function () {
  addCard();  
});




