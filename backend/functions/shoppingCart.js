const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const cors = require('cors');
const db = getFirestore();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const corsHandler = cors({ origin: true });

exports.removeItem = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { email, itemId } = req.body
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
      const { email, itemId, value } = req.body
      const cartRef = doc(db, "users", email, "cart", itemId);
      await updateDoc(cartRef, {
        quantity: Math.abs(parseInt(value, 10)) || "",
      });
      res.status(200).json("quantity updated");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

exports.fetchCart = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const cartRef = doc(db, "users", req.email, "cart", req.itemId);
      await updateDoc(cartRef, {
        quantity: Math.abs(parseInt(req.value, 10)) || "",
      });
      res.status(200).json("quantity updated");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});
