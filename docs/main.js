(()=>{"use strict";var e=document.querySelector(".content"),t=document.querySelector("#card-template").content;function n(n,r,o,c){var a=function(n,r,o,c){var a=t.querySelector(".card").cloneNode(!0);return a.querySelector(".card__image").src=n.link,a.querySelector(".card__image").alt=n.name,a.querySelector(".card__title").textContent=n.name,a.querySelector(".card__delete-button").addEventListener("click",(function(){r(a)})),e.querySelector(".places__list").addEventListener("click",o),e.querySelector(".places__list").addEventListener("click",c),a}(n,r,o,c);e.querySelector(".places__list").prepend(a)}function r(e){e.remove()}function o(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}function c(e){e.currentTarget===e.target&&s()}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function s(){document.querySelector(".popup_is-opened").classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&document.querySelector(".popup_is-opened").classList.contains("popup_is-opened")&&s()}var d=document.querySelector(".profile__edit-button"),l=document.querySelector(".profile__add-button"),u=document.querySelector(".popup_type_edit"),p=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),_=document.forms.editProfile,y=document.forms.newPlace;function f(e){if(e.target.classList.contains("card__image")){var t=document.querySelector(".popup__image"),n=document.querySelector(".popup__caption");t.src=e.target.src,t.alt=e.target.alt,n.textContent=e.target.alt,a(m)}}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){n(e,r,o,f)})),d.addEventListener("click",(function(){a(u)})),l.addEventListener("click",(function(){a(p)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){s()}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",c)})),_.addEventListener("submit",(function(e){e.preventDefault();var t=document.querySelector(".profile__title"),n=document.querySelector(".profile__description"),r=_.elements.name,o=_.elements.description;t.textContent=r.value,n.textContent=o.value,_.reset(),s()})),y.addEventListener("submit",(function(e){e.preventDefault();var t=y.elements.placeName,o=y.elements.link;n({name:t.value,link:o.value},r),y.reset(),s()}))})();