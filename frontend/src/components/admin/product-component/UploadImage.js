import { storage } from '../../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadImage = async ({ file }) => {
    if (!file) return null; 

    try {
        const storageRef = ref(storage, `product_images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file:', snapshot);
        const url = await getDownloadURL(storageRef);
        console.log('File available at:', url);
        return url; 
    } catch (error) {
        console.error('Error uploading file:', error);
        return null; 
    }
};

export default UploadImage;
