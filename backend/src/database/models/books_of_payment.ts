import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Book from "./books";
import Payment from "./payments";

class BookPayment extends Model {}

BookPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "books_of_payment" }
);

BookPayment.belongsTo(Book, {
  foreignKey: "book_id",
  as: "id",
});

BookPayment.belongsTo(Payment, {
  foreignKey: "payment_id",
  as: "id",
});

export default BookPayment;
