

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError (formElement, inputElement, errorMessage, set) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${set.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${set.errorClass}`);
};

function hideInputError (formElement, inputElement, set) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${set.inputErrorClass}`);
  errorElement.classList.remove(`${set.errorClass}`);
  errorElement.textContent = "";
};

function checkInputValidity (formElement, inputElement) {
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
  }  
    
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

function setEventListeners (formElement, set) {
  const inputList = Array.from(formElement.querySelectorAll(`${set.inputSelector}`));
  const buttonElement = formElement.querySelector(`${set.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

export function enableValidation (set) {
  const formList = Array.from(
    document.querySelectorAll(`${set.formSelector}`)
  );  
  formList.forEach((formElement) => {    
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState (inputList, buttonElement, set) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${set.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${set.inactiveButtonClass}`);
  }
};

// Создайте функцию clearValidation, которая очищает ошибки валидации формы 
// и делает кнопку неактивной. 

// Эта функция должна принимать как параметры DOM-элемент формы,
// для которой очищаются ошибки валидации и объект с настройками валидации.
 
// Используйте функцию clearValidation при заполнении формы 
// профиля во время её открытия и при очистке формы добавления карточки.


export function clearValidation (concreteForm, set) {

  concreteForm.querySelectorAll('.popup__input-error').forEach (function (concreteSpan) {
    concreteSpan.classList.remove(`${set.errorClass}`);
  });

  concreteForm.querySelectorAll('.popup__input').forEach (function (concreteInput) {
    concreteInput.classList.remove(`${set.inputErrorClass}`);
  });

  const currientButton = document.querySelectorAll(`${set.submitButtonSelector}`);
  currientButton.forEach(function (concreteButton) {
    concreteButton.classList.add(`${set.inactiveButtonClass}`);
  });
}
