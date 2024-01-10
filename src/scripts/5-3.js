// из задания 5-3

const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__input");
const formError = form.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);      
    });
  });
};

setEventListeners(form);



form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

formInput.addEventListener("input", function () {
  checkInputValidity(form, formInput);
});