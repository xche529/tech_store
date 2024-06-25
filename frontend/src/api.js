import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get(`https://us-central1-tech-store-68146.cloudfunctions.net/getProducts`);
  return response.data;
};






