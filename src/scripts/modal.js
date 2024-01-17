import { validationConfig, clearValidation } from "./validation";
import { formElementForEditProfile, formElementForCreateCard, formElementForChangeAvatar } from "./index";

// функция открытия модального окна ↓
function openModal(tengiblePopup) {
  tengiblePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscapeKey);
}

// функция закрытия модального окна ↓ 
function closeModal(openedPopup) {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscapeKey);  
}

// функция-обработчик события клика по оверлею ↓
function closeByClickOnOverlay (evt) {  
  if (evt.currentTarget === evt.target) {
    closeModal(document.querySelector('.popup_is-opened'));
    clearValidation (formElementForEditProfile, validationConfig); 
    clearValidation (formElementForCreateCard, validationConfig); 
    clearValidation (formElementForChangeAvatar, validationConfig); 
  }
}

// функция-обработчик события нажатия Esc ↓
function closeByEscapeKey (event) {
  if (event.key === 'Escape') {    
    closeModal(document.querySelector('.popup_is-opened'));
    clearValidation (formElementForEditProfile, validationConfig); 
    clearValidation (formElementForCreateCard, validationConfig);
    clearValidation (formElementForChangeAvatar, validationConfig);  
  }
}

// функция демонстрирования лодера ↓
function renderLoading (isLoading) {
  if (isLoading) {
    document.querySelectorAll('.popup__button').forEach(function (eachSubmitButton) {
      eachSubmitButton.textContent = 'Сохранение...';
    })
  } else {    
    document.querySelectorAll('.popup__button').forEach(function (eachSubmitButton) {
      eachSubmitButton.textContent = 'Сохранить';
    })
  }
}

export { 
  openModal, 
  closeModal, 
  closeByClickOnOverlay, 
  renderLoading 
};