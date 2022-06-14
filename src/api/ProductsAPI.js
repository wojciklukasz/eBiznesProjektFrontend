export const fetchProducts = async() => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/product')
        .then(response => response.json());
}

export default fetchProducts()