// ф. открытия модального окна ↓
function openModal(tengiblePopup) {
  tengiblePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscapeKey);   
}

// ф. закрытия модального окна ↓ 
function closeModal(openedPopup) {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscapeKey);  
}

// ф.-обработчик события клика по оверлею ↓
function closeByClickOnOverlay (evt) {  
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}

// ф.-обработчик события нажатия Esc ↓
function closeByEscapeKey (event) {
  if (event.key === 'Escape') {    
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

// ф. демонстрирования лодера ↓
function renderLoading (isLoading, currentForm) {
  currentForm.querySelector('.popup__button').textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

export { 
  openModal, 
  closeModal, 
  closeByClickOnOverlay, 
  renderLoading 
};