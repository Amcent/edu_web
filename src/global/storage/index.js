import MyStorage from './storage';

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    this.map = new Map();
    this.storage = new MyStorage();
  }

  static getInstance() {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  getToken() {
    return this.storage.get('web_token');
  }

  setToken(token) {
    console.log('DataStore -> setToken -> token', token);
    this.storage.set('web_token', token);
  }

  removeToken() {
    localStorage.clear();
  }

  clear() {
    localStorage.clear();
  }
}

export default DataStore.getInstance();
