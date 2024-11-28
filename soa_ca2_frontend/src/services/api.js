import axios from 'axios';

const API_BASE_URL = 'http://localhost:5118';
const API_KEY = 'S3cR3tK3yForMyAPI@2024*EducationCourse#Management';

// // Function to fetch data
// export const fetchLogin = async (endpoint) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
//       headers: {
//         'apiKey': `${API_KEY}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// };

// Function to Login
export const fetchLogin = async (endpoint, data) => {
  try {
    console.log('Posting data:', data);
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'apiKey': `${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to Register
export const fetchRegister = async (endpoint, data) => {
  try {
    console.log('Posting data:', data);
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'apiKey': `${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to fetch data
export const fetchCourses = async (endpoint, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to fetch data
export const fetchAddCourses = async (endpoint, token, data) => {
  try {
    console.log('Posting data:', data);
    await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to delete data
export const fetchDeleteCourses = async (endpoint, token, id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// Function to edit data
export const fetchEditCourses = async (endpoint, token, data) => {
  try {
    console.log('Posting data:', data);
    await axios.put(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apiKey': `${API_KEY}`
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
