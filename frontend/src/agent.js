import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
// const API_ROOT = 'http://192.168.137.1:8000/api' 
const API_ROOT = 'http://127.0.0.1:8000/api'
// const API_ROOT = 'https://ratebum.herokuapp.com/api'


let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url => 
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(res => res.body),
  get: url => 
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(res => res.body),
  put: (url, body) => 
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(res => res.body),
  post: (url, body) => 
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(res => res.body),
}

const auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login/', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users/', { user: { username, email, password } }),
  // save: user =>
  //   requests.put('/user', { user })
};


const search = query => {
  const q = query.split(' ').join('+');
  return requests.get(`/search?q=${q}`);
}

const radar = {
  items: () => 
    requests.get(`/radar`),
  add: (id, itemType) => 
    requests.post('/radar', {id: id, itemType: itemType}),
  delete: (id) =>
    requests.del(`/radar/${id}`)
}

const lineup = {
  members: (order) => 
    requests.get(`/lineup?order=${order}`),
  add: (id) => 
    requests.post('/lineup/', {id: id}),
  delete: (id) =>
    requests.del(`/lineup/${id}`)
}

export default {
  search,
  auth,
  radar,
  lineup,
  setToken: _token => { token = _token}
}