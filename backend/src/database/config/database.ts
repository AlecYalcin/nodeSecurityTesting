import sqlite from "sqlite3";

// Models
import User from "../models/users";

export const db = new sqlite.Database("library.db", (error) => {
  if (error) {
    console.error("Erro ao conectar ao SQLite.\n", error.message);
  } else {
    console.log("Conexão a Base de Dados Estabelecida!");
  }
});

export const createTables = async () => {
  await User.createUserTable();
};
