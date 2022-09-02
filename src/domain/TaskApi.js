const BASE_URL = 'http://localhost:8000/api/task';

export default class TaskApi {
  static fetch() {
    return fetch(BASE_URL, {
      method: 'get'
    }).then(res => res.json())
  };

  static create(task) {
    return fetch(BASE_URL, {
      method: 'post',
      body: JSON.stringify(task),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  };

  static remove(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'delete'
    }).then(res => res.json())
  };

  static update(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'put'
    }).then(res => res.json());
  };

  static edit(id, task) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'post',
      body: JSON.stringify(task),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  };
};