import storageAvailable from './storageAvailable';
let tokenFallback = null;

export default {

  login(token) {
    if (storageAvailable('localStorage')) {
      localStorage.setItem('userToken', token);
    } else {
      tokenFallback = token;
      alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". This will not affect the functionality of the application, but you will be logged out if you refresh the page.');
    }
  },

  isLoggedIn: function() {
    if (storageAvailable('localStorage')) {
      return !!localStorage.getItem('userToken');
    }

    return !!tokenFallback;
  },

  getToken: function() {
    if (storageAvailable('localStorage')) {
      return localStorage.getItem('userToken');
    }

    return tokenFallback;
  },

  logout: function() {
    if (storageAvailable('localStorage')) {
      localStorage.removeItem('userToken');
    } else {
      tokenFallback = null;
    }
  }

};
