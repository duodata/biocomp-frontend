import AuthenticationService from '../services/authentication.service';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = AuthenticationService.getCurrentUser();
    if (currentUser && currentUser.access) {
        return { Authorization: `JWT ${currentUser.access}` };
    } else {
        return {};
    }
}