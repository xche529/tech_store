import axios from "axios";


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

export const getCartItems = async (email) => {
  try {
    const response = await axios.post(
      "https://us-central1-tech-store-68146.cloudfunctions.net/getCartItems",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};
