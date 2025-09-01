import { Order, Product } from "../models/index.js";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../schemas/orderSchemas.js";

export const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [{ model: Product }],
  });
  res.json(orders);
};

export const createOrder = async (req, res) => {
  const validated = createOrderSchema.parse(req.body);
  const { userId, products } = validated;
  let total = 0;
  for (const { productId, quantity } of products) {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: `Product ${productId} not found` });
    }
    total += product.price * quantity;
  }
  const order = await Order.create({ userId, total });
  for (const { productId, quantity } of products) {
    const product = await Product.findByPk(productId);
    await order.addProduct(product, { through: { quantity } });
  }
  const orderWithProducts = await Order.findByPk(order.id, {
    include: [{ model: Product }],
  });
  res.status(201).json(orderWithProducts);
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, {
    include: [{ model: Product }],
  });
  if (!order) {
    return res.status(404).json({ error: `Order with ID:${id} not found` });
  }
  res.json(order);
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  const validated = updateOrderSchema.parse(req.body);
  const { products } = validated;
  if (products) {
    let total = 0;
    const productInstances = [];
    for (const { productId, quantity } of products) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${productId} not found` });
      }
      total += product.price * quantity;
      productInstances.push({ product, quantity });
    }
    await order.setProducts([]);
    for (const { product, quantity } of productInstances) {
      await order.addProduct(product, { through: { quantity } });
    }
    order.total = total;
  }
  await order.save();
  const updated = await Order.findByPk(order.id, {
    include: [{ model: Product }],
  });
  res.json(updated);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);
  if (!order) {
    return res.status(404).json({ error: `Order with ID:${id} not found` });
  }
  await order.destroy();
  res.json({ message: "Order deleted" });
};
