import firebase from '../firebase.js';
import Product from '../models/productModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';



export const createProduct = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'products'), data);
      res.status(200).send('product created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


export const getProducts = async (req, res, next) => {
    try {
      const products = await getDocs(collection(db, 'products'));
      const productArray = [];
  
      if (products.empty) {
        res.status(400).send('No Products found');
      } else {
        products.forEach((doc) => {
          const product = new Product(
            doc.id,
            doc.data().name,
            doc.data().price,
            doc.data().retailer,
            doc.data().amountInStock,
          );
          productArray.push(product);
        });
  
        res.status(200).send(productArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

export const deleteProduct = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'products', id));
      res.status(200).send('product deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

const db = getFirestore(firebase);