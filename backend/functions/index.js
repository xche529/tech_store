const {onCall} = require("firebase-functions/v2/https");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const logger = require("firebase-functions/logger");
const cors = require('cors');

admin.initializeApp();

const shoppingCart = require('./shoppingCart');

exports.removeItem = shoppingCart.removeItem;

exports.updateQuantity = shoppingCart.updateQuantity;

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const corsHandler = cors({ origin: true });

exports.getProducts = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const productsSnapshot = await admin.firestore().collection('products').get();
      const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});