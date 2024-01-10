

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

export function toggleButtonState (inputList, buttonElement, set) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${set.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${set.inactiveButtonClass}`);
  }
};


export function clearValidation () {}
