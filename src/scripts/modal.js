// функция-обработчик события клика по оверлею ↓
export function closeByClickOnOverlay (evt) {  
  if (evt.currentTarget === evt.target) { // "если элемент на который кликнули является самым нижним"
    closeModal();
  }
}

// функция открытия модального окна ↓
export function openModal(tengiblePopup) {
  tengiblePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscapeKey);
}

// функция закрытия модального окна ↓ 
export function closeModal() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscapeKey); 
}

// функция-обработчик события нажатия Esc ↓
function closeByEscapeKey (event) {
  if (event.key === 'Escape' && document.querySelector('.popup_is-opened').classList.contains('popup_is-opened')) {
    closeModal();
  }
}

