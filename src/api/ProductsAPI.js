export const fetchProducts = async() => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/product')
        .then(response => response.json());
}

export default fetchProducts()