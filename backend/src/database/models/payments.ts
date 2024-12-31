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
  },
  { sequelize, tableName: "payments" }
);

Payment.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// Payment.hasMany(BookPayment);

export default Payment;
