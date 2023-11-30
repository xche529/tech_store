import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const updateImage = async (productId, file) => {
  try {
    const storageRef = ref(getStorage(), `product_images/${productId}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }
};

export { updateImage };
