// ф. рендеринга ошибки ↓
function showInputError (formElement, inputElement, errorMessage, set) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(set.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(set.errorClass);
}

// ф. скрытия рендеринга ошибки ↓
function hideInputError (formElement, inputElement, set) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(set.inputErrorClass);
  errorElement.classList.remove(set.errorClass);
  errorElement.textContent = "";
}

// ф. проверки валидности полей и установки кастомного сообщения ↓
function checkInputValidity (formElement, inputElement, set) {
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
    inputElement.setCustomValidity("");
  }  
    
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, set);
  } else {
    hideInputError(formElement, inputElement, set);
  }
}

// ф. установки слушателей на полях ↓
function setEventListeners (formElement, set) {
  const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
  const buttonElement = formElement.querySelector(set.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, set);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, set);
      toggleButtonState(inputList, buttonElement, set);
    });
  });
}

// ф. инициации проставления слушателей на формы ↓
function enableValidation (set) {
  const formList = Array.from(
    document.querySelectorAll(set.formSelector)
  );  
  formList.forEach((formElement) => {    
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, set);
  });
}

// ф. проверки наличия в форме невалидных полей ввода  ↓
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// ф. дезактивировции кнопки отправки ↓
function disableSubmitButton(button, set) {
  button.classList.add(set.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

// ф. переключения состояния кнопки  ↓
function toggleButtonState (inputList, buttonElement, set) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, set);
  } else {
    buttonElement.classList.remove(set.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}

// ф. очистки формы от ошибок валидации ↓
function clearValidation (concreteForm, set) {
  concreteForm.querySelectorAll(set.inputSelector).forEach (function (concreteInput) {
    hideInputError (concreteForm, concreteInput, set);
  })
  const currientButton = concreteForm.querySelector(set.submitButtonSelector);
  disableSubmitButton(currientButton, set);  
}

export {   
  enableValidation, 
  clearValidation 
};
