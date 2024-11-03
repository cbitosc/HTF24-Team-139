// src/utils/api.js
const API_BASE_URL = 'https://api.yourservice.com';

export const fetchData = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};
