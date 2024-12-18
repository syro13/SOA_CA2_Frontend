import axios from 'axios';

const API_BASE_URL = 'https://educationcoursemanagementapiapp.azurewebsites.net/';
const API_KEY = 'S3cR3tK3yForMyAPI@2024*EducationCourse#Management';

// Function to Login
export const fetchLogin = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'apiKey': `${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to Register
export const fetchRegister = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'apiKey': `${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch data
export const fetch = async (endpoint, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch data (for a single item)
export const fetchAdd = async (endpoint, token, data) => {
  try {
    await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
  } catch (error) {
    throw error;
  }
};

// Function to delete data
export const fetchDelete = async (endpoint, token, id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
  } catch (error) {
    throw error;
  }
};

// Function to edit data
export const fetchEdit = async (endpoint, token, data) => {
  try {
    await axios.put(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
  } catch (error) {
    throw error;
  }
};
