const { onRequest } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const db = getFirestore();
const cors = require('cors');
const corsHandler = cors({ origin: true });

//initializeApp();

exports.removeItem = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const cartRef = doc(db, "users", req.email, "cart", req.itemId);
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
