import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const updateImage = async (productId, file) => {
    const storageRef = ref(getStorage(), `product_images/${productId}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
};

export { updateImage };
