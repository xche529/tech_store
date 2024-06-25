const {onCall} = require("firebase-functions/v2/https");
const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const {onRequest} = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const logger = require("firebase-functions/logger");
const cors = require('cors');

admin.initializeApp();


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


exports.getProductsByTags = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
    try {
      const { tags } = req.query;
      let tagsArray = tags ? tags.split(" ") : ["homepage"];
  
      let productsRef = admin.firestore().collection('products');
      let query = productsRef.where("tag", "array-contains-any", tagsArray);
  
      const snapshot = await query.get();
      const products = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
    });
  });


  exports.geProductById = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
    try {
      const { itemId } = req.query;
      if (!itemId) {
        return res.status(400).json({ error: "Missing itemId parameter" });
      }

      const itemDoc = await admin.firestore().collection('products').doc(itemId).get();

      if (!itemDoc.exists) {
        return res.status(404).json({ error: "Item not found" });
      }
  
      const item = itemDoc.data();
      return res.status(200).json(item);
    } catch (error) {
      console.error("Error fetching item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
});

  });