// Конфиг запроса ↓
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '74fac8d8-4ad0-46e7-8b61-ccf40d749a5e',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};

// ф. обработки ответа ↓
const handleResponse = (res) => {   
  if (res.ok) {
    return res.json();
  }  
  return Promise.reject(res.status)    
};

////////////////////////////////////     GET     ////////////////////////////////////

// ф. рендеринга профиля ↓
const getPersonality = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => handleResponse(res))
};

// ф. получения списка карточек ↓
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
  })
  .then((res) => handleResponse(res))
};

////////////////////////////////////     PATCH     ////////////////////////////////////

// ф. редактирования профиля ↓
const patchProfile = (newName, newDescription)  => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then((res) => handleResponse(res))
};

// ф. обновления ссылки на аватар на сервере ↓
const sendNewAvatarToServer = (linkToNewAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkToNewAvatar      
    })
  })
  .then((res) => handleResponse(res))
};

////////////////////////////////////     POST  and  PUT   ////////////////////////////////////

// ф. добавления на сервер собственной карточки ↓
const addCardToServer = (mineName, mineLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: mineName,
      link: mineLink
    }),
    headers: config.headers
  })
  .then((res) => handleResponse(res))
};

// ф. отправки лайка на сервер ↓
const sendLikeToServer = (concreteCardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${concreteCardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => handleResponse(res))
};

////////////////////////////////////     DELETE     ////////////////////////////////////

// ф. удаления лайка с сервера ↓
const deleteLikeFromServer = (concreteCardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${concreteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => handleResponse(res))
};

// ф. удаления собственной карточки с сервера ↓
const removeCardFromServer = (concreteCardId) => {
  return fetch(`${config.baseUrl}/cards/${concreteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => handleResponse(res))
};

export { 
  getPersonality,   
  getInitialCards, 
  patchProfile, 
  addCardToServer, 
  removeCardFromServer,
  sendLikeToServer, 
  deleteLikeFromServer, 
  sendNewAvatarToServer
};
