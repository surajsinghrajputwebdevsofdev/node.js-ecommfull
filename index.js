import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import cors from "cors";
import stripe from 'stripe';

const stripeApiKey = 'pk_test_51OXfO9L9R1tkirXXwgPpJKpW8O6Su0D4HD9Tuuipe4OcMFXRtfnEzU6Yyy2yib6knOivSonRxp4cq32oeoNf6igv00SBQO75jj';
const stripeInstance = stripe(stripeApiKey);

import {
  deleteProduct,
  getAllProducts,
  saveProduct,
  updateProduct,
} from "./controllers/Product.js";
// ye uper bhi add keya hai product.html ka path
import { fileURLToPath } from "url";
import * as path from "path";
import { loginUser, saveuser } from "./controllers/Register.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storageProduct = multer.diskStorage({
  destination: "uploadProduct/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadProduct = multer({
  storage: storageProduct,
});

app.post("/product", uploadProduct.array("image"), saveProduct);
app.put("/product", uploadProduct.array("image"), updateProduct);
app.delete("/product", deleteProduct);
app.get("/product", getAllProducts);

const storageuser = multer.diskStorage({
  destination: "uploaduser/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploaduser = multer({
  storage: storageuser,
});
app.post("/register", uploaduser.array("image"), saveuser);
app.post("/login", loginUser);

app.get("/", function (req, res) {
  res.sendFile(
    path.join(fileURLToPath(import.meta.url), "..", "views", "Home.html")
  );
});
app.get("/enterproduct", function (req, res) {
  res.sendFile(
    path.join(fileURLToPath(import.meta.url), "..", "views", "Product.html")
  );
});
app.get("/home", function (req, res) {
  res.sendFile(
    path.join(fileURLToPath(import.meta.url), "..", "views", "Home.html")
  );
});
app.get("/register", function (req, res) {
  res.sendFile(
    path.join(fileURLToPath(import.meta.url), "..", "views", "Register.html")
  );
});
app.get("/login", function (req, res) {
  res.sendFile(
    path.join(fileURLToPath(import.meta.url), "..", "views", "Login.html")
  );
});
app.get("/addtocart", function (req, res) {
  res.sendFile(
    path.join(fileURLToPath(import.meta.url), "..", "views", "AddToCart.html")
  );
});
// -------------------------------------------------
// app.use(express.static("uploadProduct/"));
// app.use(express.static(path.join('uploadProduct/')));
app.use("/uploadProduct", express.static(path.join("uploadProduct")));
app.use("/images", express.static(path.join("images")));

mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("Database connected.");
    app.listen(process.env.PORT, () => {
      console.log("Server running at port: " + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("Database connection error:", e);
  });

app.post('/charge', async (req, res) => {
  try {
    const { amount, source, currency } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
      description: 'Payment for services',
    });
    res.status(200).json(charge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
