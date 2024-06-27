const { onRequest } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const cors = require("cors");

admin.initializeApp();
const db = getFirestore();
const corsHandler = cors({ origin: true });

const getCartRef = (email, itemId) => {
  const productCollectionRef = db.collection("users");
  const productDocRef = productCollectionRef.doc(email);
  const typeCollectionRef = productDocRef.collection("cart");
  return typeCollectionRef.doc(itemId);
};

exports.removeItem = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      logger.info("Request body:", req.body);
      const { email, itemId } = req.body;
      const cartRef = doc(db, "users", email, "cart", itemId);
      await deleteDoc(cartRef);
      res.status(200).json("removed");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

exports.updateQuantity = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { itemId, email, value } = req.body;
      const cartRef = getCartRef(email, itemId);

      await cartRef.update({
        quantity: value,
      });
      res.status(200).json("quantity updated");
    } catch (error) {
      logger.error("Error updating quantity:", error);
      res.status(500).json({ error: error.message });
    }
  });
});

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.updateProductInfo = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { productId, name, price, stock, description } = req.body;
      const productDocRef = db
        .collection("products")
        .doc(productId);
      await productDocRef.update({ 
        name: name, 
        price: price, 
        stock: stock, 
        description: description});
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

exports.uploadImageToStorage = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { productId } = req.body;
      const file = req.file;

      if (!productId || !file) {
        return res.status(400).send("ProductId and file are required");
      }

      const storageBucket = admin.storage().bucket();
      const storagePath = `product_images/${file.name}`;

        // Upload file to Cloud Storage
        const storageRef = storageBucket.file(storagePath);
        const metadata = {
          contentType: file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        };
        await storageRef.save(file.buffer, { metadata });

      // Get download URL of the uploaded file
      const downloadURL = await storageRef.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      // Update Firestore document with the download URL
      const productDocRef = db
        .collection("products")
        .doc(productId);
      await productDocRef.update({ imageURL: downloadURL });

      // Respond with success message or updated product data
      res.status(200).json({
        message: "Image uploaded successfully",
        imageURL: downloadURL,
      });
    } catch (error) {
      console.error("Error uploading image:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });
});

exports.getProducts = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const productsSnapshot = await admin
        .firestore()
        .collection("products")
        .get();
      const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

exports.getProductsByTags = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { tags } = req.query;
      let tagsArray = tags ? tags.split(" ") : ["homepage"];

      let productsRef = admin.firestore().collection("products");
      let query = productsRef.where("tag", "array-contains-any", tagsArray);

      const snapshot = await query.get();
      const products = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

exports.getProductById = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { itemId } = req.query;
      if (!itemId) {
        return res.status(400).json({ error: "Missing itemId parameter" });
      }

      const itemDoc = await admin
        .firestore()
        .collection("products")
        .doc(itemId)
        .get();

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
