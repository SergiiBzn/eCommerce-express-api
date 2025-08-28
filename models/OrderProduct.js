import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/index.js';

class OrderProduct extends Model {}

OrderProduct.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    modelName: 'OrderProduct',
    tableName: 'order_products',
    timestamps: false,
  }
);

export default OrderProduct;
