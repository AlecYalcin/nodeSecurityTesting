import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../../database.sqlite",
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão realizada com sucesso!");
  } catch (error) {
    console.log("Houve um erro ao tentar conectar. \n", error);
  }
};
