(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-4",headers:{authorization:"74fac8d8-4ad0-46e7-8b61-ccf40d749a5e","Content-Type":"application/json; charset=UTF-8"}},t=function(e){return e.ok?e.json():Promise.reject(e.status)},n=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers})},r=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers})},o=document.querySelector(".content"),c=document.querySelector("#card-template").content;function a(e,o,c,a){(o?r:n)(e).then((function(e){return t(e)})).then((function(e){a.target.classList.contains("card__like-button")&&a.target.classList.toggle("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка обработки кнопки лайка: ".concat(e))}))}function u(n,r){var o;(o=r,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers})).then((function(e){return t(e)})).catch((function(e){console.log("Ошибка удаления собственной карточки с сервера: ".concat(e))})),n.remove()}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)}function s(e){e.currentTarget===e.target&&l(e.currentTarget)}function d(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function f(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}var p=".popup__form",_=".popup__input",m=".popup__button",y="popup__button_disabled",h="popup__input_type_error",v="popup__error_visible";function S(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(h),n.classList.remove(v),n.textContent=""}function b(e){e.classList.add(y),e.setAttribute("disabled",!0)}function q(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(y),t.removeAttribute("disabled")):b(t)}function g(e){e.querySelectorAll(_).forEach((function(t){S(e,t)})),b(e.querySelector(m))}function k(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var L=o.querySelector(".places__list"),E=document.querySelector(".profile__edit-button"),C=document.querySelector(".profile__add-button"),A=document.querySelector(".profile__image"),x=document.querySelector(".popup_type_edit"),U=document.querySelector(".popup_type_new-card"),T=document.querySelector(".popup_type_image"),w=document.querySelector(".popup_type_change-avatar"),j=document.forms.editProfile,O=document.forms.newPlace,P=document.forms.changeAvatar,D=j.elements.name,N=j.elements.description,M=O.elements.placeName,I=O.elements.link,J=P.elements.URL,H=document.querySelector(".popup__image"),V=document.querySelector(".popup__caption");function z(e,t,n,r,o,a){var u=function(e,t,n,r,o,a){var u=c.querySelector(".card").cloneNode(!0);u.querySelector(".card__image").src=e.link,u.querySelector(".card__image").alt=e.name,u.querySelector(".card__title").textContent=e.name,u.querySelector(".card__delete-button").addEventListener("click",(function(){return t(u,a)}));var i=u.querySelector(".card__like-counter");return i.textContent=o,u.querySelector(".card__like-button").addEventListener("click",(function(e){var t=u.querySelector(".card__like-button").classList.contains("card__like-button_is-active");n(a,t,i,e)})),u.querySelector(".card__image").addEventListener("click",(function(){return r(e.link,e.name)})),u}(e,t,n,r,o,a);L.prepend(u)}function F(e,t){H.src=e,H.alt=t,V.textContent=t,i(T)}E.addEventListener("click",(function(){D.value=document.querySelector(".profile__title").textContent,N.value=document.querySelector(".profile__description").textContent,i(x),f(!1,x)})),C.addEventListener("click",(function(){i(U),f(!1,U)})),A.addEventListener("click",(function(){i(w),f(!1,w)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){l(document.querySelector(".popup_is-opened"))}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",s)})),j.addEventListener("submit",(function(n){var r,o;n.preventDefault(),(r=D.value,o=N.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})})).then((function(e){return t(e)})).then((function(e){document.querySelector(".profile__title").textContent=e.name,document.querySelector(".profile__description").textContent=e.about})).catch((function(e){console.log("Ошибка редактирования профиля: ".concat(e))})),f(!0,x),j.reset(),l(x),g(j)})),O.addEventListener("submit",(function(n){n.preventDefault();var r,o,c={name:M.value,link:I.value};(r=c.name,o=c.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",body:JSON.stringify({name:r,link:o}),headers:e.headers})).then((function(e){return t(e)})).then((function(e){z(e,u,a,F,e.likes.length,e._id)})).catch((function(e){console.log("Ошибка добавления на сервер собственной карточки: ".concat(e))})),O.reset(),f(!0,U),l(U),g(O)})),P.addEventListener("submit",(function(n){var r;n.preventDefault(),(r=J.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})})).then((function(e){return t(e)})).then((function(e){console.log(e),document.querySelector(".profile__avatar").src=e.avatar})).catch((function(e){console.log("Ошибка обновления аватара: ".concat(e))})),f(!0,w),P.reset(),l(w),g(P)})),Array.from(document.querySelectorAll(p)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(_)),n=e.querySelector(m);q(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?S(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(h),r.textContent=n,r.classList.add(v)}(e,t,t.validationMessage)})(e,r),q(t,n)}))}))}(e)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})).catch((function(e){console.log("Ошибка рендеринга профиля: ".concat(e))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)})).catch((function(e){console.log("Ошибка получения списка карточек: ".concat(e))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return k(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?k(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];document.querySelector(".profile__title").textContent=o.name,document.querySelector(".profile__description").textContent=o.about,document.querySelector(".profile__avatar").src=o.avatar,c.forEach((function(e){z(e,u,a,F,e.likes.length,e._id);var t=document.querySelector(".card__like-counter").closest(".card"),n=t.querySelector(".card__delete-button");e.owner._id!==o._id&&n.classList.add("card__delete-button_hidden"),function(e,t,n){e.forEach((function(){e.some((function(e){return e._id===t}))&&n.querySelector(".card__like-button").classList.add("card__like-button_is-active")}))}(e.likes,o._id,t)}))}))})();