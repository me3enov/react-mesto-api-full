class Api {
  constructor(config) {
    this._headers = config.headers;
    this._url = config.url;
    this._cardsUrl = config.cardsUrl;
    this._cardsLikesUrl = config.cardsLikesUrl;
    this._userAvatarUrl = config.userAvatarUrl;
    this._userInfoUrl = config.userInfoUrl;
    this._errorText = config.errorText;
  }

  //get header
  getHeader() {
    const token = localStorage.getItem('jwt');
    return {
        ...this._headers,
        Authorization: `Bearer ${token}`,
    }
  }

  //get user info
  getUserInfo() {
    return fetch(`${this._url}${this._userInfoUrl}`, {
      method: 'GET',
      headers: this.getHeader(),
    })
    .then(this._checkServerResponse)
  }

  //get all cards
  getCards() {
    return fetch(`${this._url}${this._cardsUrl}`, {
      method: 'GET',
      headers: this.getHeader(),
    })
    .then(this._checkServerResponse)
  }

  //get all data
  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  //set user info
  setUserInfo(userData) {
    return fetch(`${this._url}${this._userInfoUrl}`, {
      method: 'PATCH',
      headers: this.getHeader(),
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkServerResponse)
  }

  //set user avatar
  setUserAvatar(link) {
    return fetch(`${this._url}${this._userAvatarUrl}`, {
      method: 'PATCH',
      headers: this.getHeader(),
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkServerResponse)
  }

  //new card
  addNewCard(cardData) {
    return fetch(`${this._url}${this._cardsUrl}`, {
      method: 'POST',
      headers: this.getHeader(),
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._checkServerResponse)
  }

  //remove card
  removeCard(cardData) {
    return fetch(`${this._url}${this._cardsUrl}/${cardData._id}`, {
      method: 'DELETE',
      headers: this.getHeader(),
    })
    .then(this._checkServerResponse)
  }

  //change like card status
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}${this._cardsUrl}/${cardId}${this._cardsLikesUrl}`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this.getHeader(),
      })
      .then(this._checkServerResponse)
  }

  //check response from server
  _checkServerResponse(res) {
    if (!res.ok) {
      return Promise.reject(`${this._errorText} ${res.status}`);
    }
    return res.json();
  }
}

const api = new Api({
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'api.mesto.me3enov.nomoredomains.club',
  cardsUrl: '/cards',
  cardsLikesUrl: '/likes',
  userAvatarUrl: '/users/me/avatar',
  userInfoUrl: '/users/me',
  errorText: 'Ошибка:'
});

export default api;