//      Конфиг запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '74fac8d8-4ad0-46e7-8b61-ccf40d749a5e',
    'Content-Type': 'application/json; charset=UTF-8'
  }
};

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     GET     ////////////////////////////////////

// ф рендеринга профиля
const getPersonality  = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка рендеринга профиля: ${err}`); /// вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};

// ф получения списка карточек
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка получения списка карточек: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};


///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     PATCH     ////////////////////////////////////

// ф редактирования профиля
const patchProfile = (newName, newDescription)  => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newDescription
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка редактирования профиля: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};

// ф обновления ссылки на аватар на сервере
const sendNewAvatarToServer = (linkToNewAvatar) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkToNewAvatar      
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка обновления аватара: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     POST  and  PUT   ////////////////////////////////////

// ф добавления на сервер собственной карточки ↓
const addCardToServer = (mineName, mineLink) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: mineName,
      link: mineLink
    }),
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка добавления на сервер собственной карточки: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};

// ф отправки лайка на сервер
const sendLikeToServer = (concreteCardId) => {
  fetch(`${config.baseUrl}/cards/likes/${concreteCardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка отправки лайка на сервер: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     DELETE     ////////////////////////////////////

// ф удаления лайка с сервера
const deleteLikeFromServer = (concreteCardId) => {
  fetch(`${config.baseUrl}/cards/likes/${concreteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка удаления лайка с сервера: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
};

// ф удаления собственной карточки с сервера ↓
const removeCardFromServer = (concreteCardId) => {
  fetch(`${config.baseUrl}/cards/${concreteCardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }  
    return Promise.reject(res.status)
    })
  .catch((err) => {
    console.log(`Ошибка удаления собственной карточки с сервера: ${err}`); // вывожу ошибку в консоль - сделать модалку в отдельной ветке и смержить
  })
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
