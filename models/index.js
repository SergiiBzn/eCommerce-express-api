import sequelize from '../db/index.js';
import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import OrderProduct from './OrderProduct.js';

// User — Order (1:M)
User.hasMany(Order, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'CASCADE',
});
Order.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'CASCADE',
});

// Category — Product (1:M)
Category.hasMany(Product, {
  foreignKey: { name: 'categoryId', allowNull: false },
  onDelete: 'RESTRICT',
});
Product.belongsTo(Category, {
  foreignKey: { name: 'categoryId', allowNull: false },
  onDelete: 'RESTRICT',
});

// Order — Product (M:N)
Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: 'orderId',
  otherKey: 'productId',
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: 'productId',
  otherKey: 'orderId',
});

// await sequelize.sync({ force: true });
await sequelize.sync();

export { User, Category, Product, Order, OrderProduct };
