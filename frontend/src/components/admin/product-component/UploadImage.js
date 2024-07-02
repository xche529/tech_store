import { storage } from '../../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadImage = async ({ file }) => {
    if (!file) return null; // Check if file exists

    try {
        // Create a reference to the storage location
        const storageRef = ref(storage, `product_images/${file.name}`);

        // Upload the file to the storage location
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file:', snapshot);

        // Get the download URL for the file
        const url = await getDownloadURL(storageRef);
        console.log('File available at:', url);
        return url; // Return the download URL
    } catch (error) {
        console.error('Error uploading file:', error);
        return null; // Return null on error
    }
};

export default UploadImage;
