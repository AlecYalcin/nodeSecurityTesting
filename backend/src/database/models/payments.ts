import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import BookPayment from "./books_of_payment";
import User from "./users";

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
    data: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, tableName: "payments" }
);

Payment.belongsTo(User);
// Payment.hasMany(BookPayment);

export default Payment;
