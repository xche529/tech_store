const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const cors = require("cors");
const { user } = require("firebase-functions/v1/auth");

admin.initializeApp();
const db = getFirestore();
const corsHandler = cors({ origin: true });

const getCartRef = (email, itemId) => {
  const userCollectionRef = db.collection("users");
  const userDocRef = userCollectionRef.doc(email);
  const cartCollectionRef = userDocRef.collection("cart");
  return cartCollectionRef.doc(itemId);
};

exports.addUser = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { email } = req.body;
            const userCollectionRef = db.collection("users");
            if (!userCollectionRef.doc(email).exists) {
                // Add user to users collection, user id is email
                await userCollectionRef.doc(email).set(
                    {
                        email: email,
                    },
                    { merge: true
                }
                );
            }
            // Add a new cart collection to the user
            const cartCollectionRef = userCollectionRef.doc(email).collection("cart");
            await cartCollectionRef.add({ 
                id: "1",
                quantity: 1,
             });
            res.status(200).json({ message: "User added successfully" });
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    }); 
});

exports.CheckAdmin = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { email, password} = req.body;
            const userDocRef = db.collection("admin").doc(email);
              const userDoc = await userDocRef.get();
                if (userDoc.exists) {
                    const data = userDoc.data();
                    if (data.password === password) {
                        res.status(200).json({ isAdmin: true });
                    } else {
                        res.status(200).json({ isAdmin: false });
                    }
                }
                else {
                    res.status(200).json({ isAdmin: false });
                }
        } catch (error) {
            res.status(500).json({ error: "Something went wrong" });
        }
    });
});




exports.getCart = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { email } = req.body;
      const userCollectionRef = db.collection("users");
      const userDocRef = userCollectionRef.doc(email);
      const cartCollectionRef = userDocRef.collection("cart");
      const cartSnapshot = await cartCollectionRef.get();
    const cartItems = await Promise.all(
        cartSnapshot.docs.map(async (doc) => {
          const productDoc = await db.collection("products").doc(doc.id).get();
          return {
            id: doc.id,
            quantity: doc.data().quantity,
            product: productDoc.exists ? productDoc.data() : null,
          };
        })
      );

      res.status(200).json(cartItems);

    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

exports.removeItem = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      logger.info("Request body:", req.body);
      const { email, itemId } = req.body;
      const cartRef = getCartRef(email, itemId);
      await cartRef.delete(cartRef);
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
      // If item exists in cart, update the quantity, otherwise add the item to the cart
      if (getCartRef(email, itemId).exists) {
      const cartRef = getCartRef(email, itemId);
      await cartRef.update({
        quantity: value,
      });
    } else {
        // Add the item to the cart
        const userCollectionRef = db.collection("users");
        const cartCollectionRef = userCollectionRef.doc(email).collection("cart");
        await cartCollectionRef.add({
          id: itemId,
          quantity: value,
        });
    }
      res.status(200).json("quantity updated");
    } catch (error) {
      logger.error("Error updating quantity:", error);
      res.status(500).json({ error: error.message });
    }
  });
});

exports.updateProductInfo = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { productId, name, price, stock, description } = req.body;
      const productDocRef = db.collection("products").doc(productId);
      await productDocRef.update({
        name: name,
        price: price,
        stock: stock,
        description: description,
      });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

exports.uploadImageToStorage = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { productId, file } = req.body;

      // Ensure the file object is present
      if (!file || !file.name || !file.buffer) {
        throw new Error("File is missing or incorrect format");
      }

      const storageBucket = admin.storage().bucket();
      const storagePath = `product_images/${file.name}`;

      const storageRef = storageBucket.file(storagePath);

      await storageRef.save(Buffer.from(file.buffer, "base64"));

      const [downloadURL] = await storageRef.getSignedUrl({
        action: "read",
        expires: "01-01-2100",
      });

      const productDocRef = admin
        .firestore()
        .collection("products")
        .doc(productId);
      await productDocRef.update({ imageUrl: downloadURL });

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

exports.createNewItem = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const productCollectionRef = db.collection("products");
            const { name, price, stock, description, imageUrl, category, tags} = req.body;
            await productCollectionRef.add({
                name: name,
                price: price,
                stock: stock,
                description: description,
                imageUrl: imageUrl,
                category: category,
                tag: ["homepage" , ...tags],
            });
            console.log("Product added successfully");
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    );
});

exports.updateImage = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { itemId, imageUrl } = req.body;
            const productDocRef = db.collection("products").doc(itemId);
            await productDocRef.update({ imageUrl: imageUrl });
            console.log("Image updated successfully");
        } catch (error) {
            console.error("Error updating image:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

