// Packages
import express from "express";

// Modules
import { sequelize, testConnection } from "./config/database";

const app = express();

app.get("/", (req, res) => {});

app.listen(3000);
