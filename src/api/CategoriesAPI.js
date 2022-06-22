export const fetchCategories = async() => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/category')
        .then(response => response.json());
};

export const fetchCategory = async(id) => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/category/' + id)
        .then(response => response.json());
};

export const fetchCategoryItems = async(id) => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/category/' + id + '/all')
        .then(response => response.json());
};