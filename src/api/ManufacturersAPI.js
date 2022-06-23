export const fetchManufacturers = async() => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/manufacturer')
        .then(response => response.json());
};

export const fetchManufacturer = async(id) => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/manufacturer/' + id)
        .then(response => response.json());
};

export const fetchManufacturerItems = async(id) => {
    return fetch('https://ebiznesprojektbackend.azurewebsites.net/api/v1/manufacturer/' + id + '/all')
        .then(response => response.json());
};