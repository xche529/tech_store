import { getStorage, ref, deleteObject } from 'firebase/storage';

const deleteImage = async (imageUrl) => {
    try{
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    } catch (error) {
        console.error(error);
    }
};

export { deleteImage };
