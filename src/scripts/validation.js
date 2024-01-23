import { validationConfig } from "./validationConfig";

const formSelector = validationConfig.formSelector;
const inputSelector = validationConfig.inputSelector;
const submitButtonSelector = validationConfig.submitButtonSelector;
const inactiveButtonClass = validationConfig.inactiveButtonClass;
const inputErrorClass = validationConfig.inputErrorClass;
const errorClass = validationConfig.errorClass;

// ф. рендеринга ошибки ↓
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// ф. скрытия рендеринга ошибки ↓
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

// ф. проверки валидности полей и установки кастомного сообщения ↓
function checkInputValidity (formElement, inputElement) {
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
  }  
    
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// ф. установки слушателей на полях ↓
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// ф. инициации проставления слушателей на формы ↓
function enableValidation () {
  const formList = Array.from(
    document.querySelectorAll(formSelector)
  );  
  formList.forEach((formElement) => {    
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

// ф. проверки наличия в форме невалидных полей ввода  ↓
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// ф. дезактивировции кнопки отправки ↓
function disableSubmitButton(button) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
}

// ф. переключения состояния кнопки  ↓
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}

// ф. очистки формы от ошибок валидации ↓
function clearValidation (concreteForm) {
  concreteForm.querySelectorAll(inputSelector).forEach (function (concreteInput) {
    hideInputError (concreteForm, concreteInput);
  })
  const currientButton = concreteForm.querySelector(submitButtonSelector);
  disableSubmitButton(currientButton);  
}

export {   
  enableValidation, 
  clearValidation 
};
