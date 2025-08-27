import Category from "../models/Category.js";

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      body: { name },
    } = req;
    if (!name) throw new Error("Name for category required");
    const found = await Category.findOne({ where: { name } });
    if (found) throw new Error("Category already exists");
    const category = await Category.create(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const {
      body: { name },
      parama: { id },
    } = req;
    if (!name) throw new Error("Name of category required");
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
