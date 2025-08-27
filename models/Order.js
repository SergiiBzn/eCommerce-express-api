import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

//Hilfstabelle OrderProduct
const OrderProduct = sequelize.define("OrderProduct", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Orders",
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Products",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
export { Order, OrderProduct };
