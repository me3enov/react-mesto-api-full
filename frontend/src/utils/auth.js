const authUrl = 'https://auth.nomoreparties.co';

export const registration = (email, password) => {
  return fetch(`${authUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkServerResponse(res))
};

export const login = (email, password) => {
  return fetch(`${authUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(res => checkServerResponse(res))
};

export const getMe = (token) => {
  return fetch(`${authUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => checkServerResponse(res))
};

function checkServerResponse(res) {
  if (!res.ok) {
    return Promise.reject(`${this._errorText} ${res.status}`);
  }
  return res.json();
}