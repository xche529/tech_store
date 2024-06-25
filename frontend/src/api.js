import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get(`https://us-central1-tech-store-68146.cloudfunctions.net/getProducts`);
  return response.data;
};

export const fetchProductsByTag = async (keyWords) => {
    try {
      const response = await axios.get('https://us-central1-tech-store-68146.cloudfunctions.net/getProductsByTags', {
        params: { tags: keyWords.join(" ") }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  export const getProductById = async (itemId) => {
    try {
      const response = await axios.get(' https://us-central1-tech-store-68146.cloudfunctions.net/getProductById', {
        params: { itemId }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching item:", error);
      return null;
    }
  };






