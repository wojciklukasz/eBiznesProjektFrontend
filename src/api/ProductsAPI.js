export const fetchProducts = async() => {
    return fetch('http://localhost:8000/api/v1/product')
        .then(response => response.json());
}

export default fetchProducts()