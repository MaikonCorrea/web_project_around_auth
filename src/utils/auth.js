const BASE_URL = 'https://register.nomoreparties.co';

export const signup = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST', 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.status === 201){
                console.log(response.status)
                return response.json();
              }
        })
        .then((res) => {
            console.log(res)
            return res;
        })
        .catch((err) => console.log(err));
    }

export const signin = (identifier, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
    })
    .then((response => response.json()))
    .then((data) => {
        if (data.user) {
            localStorage.setItem('jwt', data.jwt);
            return data;
        }
    })
    .catch((err => console.log(err)))
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((res => res.json()))
    .then((data => data))
}