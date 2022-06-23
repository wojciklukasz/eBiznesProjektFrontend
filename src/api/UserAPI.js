export const validateUserToken = async(token) => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/user/validate/' + token)
        .then(response => response.json());
};