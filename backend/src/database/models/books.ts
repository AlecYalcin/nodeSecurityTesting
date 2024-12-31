import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  { sequelize, tableName: "books" }
);

export default Book;
