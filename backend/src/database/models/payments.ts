import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Book from "./books";
import User from "./users";

export interface PaymentAttribute {
  id: number;
  user_id: number;
  book_id: number;
  quantity: number;
  total_price: number;
}

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  { sequelize, tableName: "payments" }
);

Payment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Payment.belongsTo(Book, {
  foreignKey: "book_id",
  as: "book",
});

export default Payment;
