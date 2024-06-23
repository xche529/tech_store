import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await axios.get(`http://localhost:5000/api/get`);
  return response.data;
};

// export const createProduct = async (product) => {
//   const response = await axios.post(`${API_URL}/products`, product);
//   return response.data;
// };

// export const deleteProduct = async (id) => {
//   const response = await axios.delete(`${API_URL}/products/${id}`);
//   return response.data;
// };




