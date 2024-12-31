import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./library.db",
  logging: false,
});

export const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("Erro in database syncronization.\n", error);
  }
};
