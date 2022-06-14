export const fetchManufacturer = async(id) => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/manufacturer/' + id)
        .then(response => response.json());
};

export const fetchManufacturerItems = async(id) => {
    // TO DO: CHANGE WHEN DEPLOYING
    return fetch('http://localhost:3051/api/v1/manufacturer/' + id + '/all')
        .then(response => response.json());
};