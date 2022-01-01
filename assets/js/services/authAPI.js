import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Déconnexion (suppression du token du localStorage et sur Axios)
 */
function logout() {
    window.localStorage.removeItem('authToken');
    delete axios.defaults.headers['Authorization'];
}

/**
 * Requête d'authentification et stockage du token dans le localStorage et sur Axios
 * @param {object} credentials 
 */
function authenticate(credentials) {
    return axios
        .post(
            'https://localhost:8000/api/login_check',
            credentials
        )
        .then(
            response => response.data.token
        )
        .then(token => {
            // Je stocke le token dans mon localStorage
            window.localStorage.setItem("authToken", token);
            // On prévient Axios qu'on a un header par défaut sur toutes nos futures requêtes HTTP
            setAxiosToken(token);
        });
}

/**
 * Positionne le token JWT sur Axios
 * @param {string} token Le token JWT
 */
function setAxiosToken(token) {
    axios.defaults.headers['Authorization'] = 'Bearer ' + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setUp() {
    // 1. Voir si on a un token ?
    const token = window.localStorage.getItem('authToken');
    // 2. Si le token est valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
            console.log('Connexion établie avec Axios !')
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns boolean
 * 
 */
function isAuthenticated() {
    // 1. Voir si on a un token ?
    const token = window.localStorage.getItem('authToken');
    // 2. Si le token est valide
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate: authenticate,
    logout: logout,
    setUp: setUp,
    isAuthenticated: isAuthenticated
};