import express from "express";
import bodyParser from "body-parser";

import connectToDatabase from "./dbConfig";
import routes from "./src/routes";
import userRoutes from "./src/routes/user";
import addressRoutes from "./src/routes/address";
import authRoutes from "./src/routes/auth";
import { PORT } from "./config.js";

const app = express();
connectToDatabase();

// Agrega las rutas al servidor principal

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/auth", authRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
