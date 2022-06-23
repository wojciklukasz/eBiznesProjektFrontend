export const fetchCategories = async() => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/category')
        .then(response => response.json());
};

export const fetchCategory = async(id) => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/category/' + id)
        .then(response => response.json());
};

export const fetchCategoryItems = async(id) => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/category/' + id + '/all')
        .then(response => response.json());
};