export const fetchProducts = async() => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/product')
        .then(response => response.json());
};

export const fetchProduct = async(id) => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/product/' + id)
        .then(response => response.json());
};
