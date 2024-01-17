 import { validationConfig, clearValidation } from "./validation";
 import { formElementForEditProfile, formElementForCreateCard, formElementForChangeAvatar } from "./index";




// функция открытия модального окна ↓
export function openModal(tengiblePopup) {
  tengiblePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscapeKey);
}

// функция закрытия модального окна ↓ 
export function closeModal(openedPopup) {
  openedPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscapeKey);  
}

// функция-обработчик события клика по оверлею ↓
export function closeByClickOnOverlay (evt) {  
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

