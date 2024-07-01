import axios from "axios";

export const addUser = async (email) => {
    try {
        const response = await axios.post(
        "https://us-central1-tech-store-68146.cloudfunctions.net/addUser",
        {
            email,
        }
        );
        return response.data;
    }
    catch (error) {
        console.error("Error adding user:", error);
        return null;
    }
};



export const fetchProducts = async () => {
  const response = await axios.get(
    `https://us-central1-tech-store-68146.cloudfunctions.net/getProducts`
  );
  return response.data;
};

export const fetchProductsByTag = async (keyWords) => {
  try {
    const response = await axios.get(
      "https://us-central1-tech-store-68146.cloudfunctions.net/getProductsByTags",
      {
        params: { tags: keyWords.join(" ") },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const RemoveItemFromCart = async (itemId, email) => {
    try {
        const response = await axios.post(
        "https://us-central1-tech-store-68146.cloudfunctions.net/removeItem",
        {
            itemId,
            email,
        }
        );
        return response.data;
    } catch (error) {
        console.error("Error removing item from cart:", error);
        return null;
    }
    }

export const getProductById = async (itemId) => {
  try {
    const response = await axios.get(
      " https://us-central1-tech-store-68146.cloudfunctions.net/getProductById",
      {
        params: { itemId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching item:", error);
    return null;
  }
};

  export const updateImage = async (itemId, file) => {
    try {
      const response = await axios.post('https://us-central1-tech-store-68146.cloudfunctions.net/uploadImageToStorage', {
        itemId,
        file
      });
      return response.data;
    } catch (error) {
        console.error(error.response.data);
      return null;
    }
  }

export const updateQuantity = async (itemId, value, email) => {
  try {
    console.log(itemId, value, email);
    const response = await axios.post(
      "https://us-central1-tech-store-68146.cloudfunctions.net/updateQuantity",
      {
        itemId,
        value,
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error);
    return null;
  }
};

export const updatProductField = async (productId, name, price, stock, description) => { 
    try {
        const response = await axios.post(
        "https://us-central1-tech-store-68146.cloudfunctions.net/updateProductInfo",
        {
            productId,
            name,
            price,
            stock,
            description,
        }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating product field:", error);
        return null;
    }
};

export const createNewItem = async (name, price, stock, description) => {
    try {
        const response = await axios.post(
        "https://us-central1-tech-store-68146.cloudfunctions.net/createItem",
        {
            name,
            price,
            stock,
            description,
        }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating new item:", error);
        return null;
    }
}

export const deleteItem = async (itemId) => {
    try {
        const response = await axios.post(
        "https://us-central1-tech-store-68146.cloudfunctions.net/deleteItem",
        {
            itemId,
        }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting item:", error);
        return null;
    }
}

export const getCart = async (email) => {
    try {
      const response = await axios.post(
        'https://us-central1-tech-store-68146.cloudfunctions.net/getCart',
        { email }
      );

      const productDetails = response.data.map(item => item.product);
  
     // return quantity and product details
        return response.data.map((item, index) => ({
            ...item,
            quantity: item.quantity,
            ...productDetails[index]
        }));
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  };
