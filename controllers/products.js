import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      body: { name, description, price },
    } = req;
    if (!name || !description || !price)
      throw new Error("Name, description and price are required");
    const found = await Product.findOne({ where: { name } });
    if (found) throw new Error("Product already exists");
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ error: `Product with ID:${id} not found` });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      body: { name, description, price },
      params: { id },
    } = req;
    if (!name || !description || !price)
      throw new Error("Name, description and price are required");
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: `Product not found` });
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: `Product not found` });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
