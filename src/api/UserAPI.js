export const validateUserToken = async(token) => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/user/validate/' + token)
        .then(response => response.json());
};