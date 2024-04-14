import ProductModel from "../models/Product.js";


export const saveProduct = async (req, res) => {
  try {
    const { name, descriptions, qty, price, active } = req.body;
    const images = req.files.map(file => file.path); 

    const newProduct = new ProductModel({
      name,
      descriptions,
      qty,
      price,
      active,
      image: images 
    });

    await newProduct.save();

    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, descriptions, qty, price, active, image } = req.body;

    let product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.descriptions = descriptions;
    product.qty = qty;
    product.price = price;
    product.active = active;
    product.image = image;

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();

    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
