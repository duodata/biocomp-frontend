// import config from 'config';
import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handle-response';
import config from './config'

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export default new class AuthenticationService {

  currentUser = currentUserSubject.asObservable();

  login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };

    return fetch(`${config.apiUrl}/auth/jwt/create/`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
  }

  getCurrentUser() {
    return currentUserSubject.value;
  }

}();