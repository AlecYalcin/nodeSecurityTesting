import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export interface BookAttribute {
  id: number;
  title: string;
  author: string;
  description: string | null;
  price: number;
  stock: number;
  img: string | null;
}

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
    price: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "books" }
);

export default Book;
