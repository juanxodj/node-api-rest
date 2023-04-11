import express from "express";
import bodyParser from "body-parser";

import connectToDatabase from "./src/config/database";
import routes from "./src/routes";
import userRoutes from "./src/routes/user";
import addressRoutes from "./src/routes/address";
import authRoutes from "./src/routes/auth";
import { PORT } from "./src/config/env";

const app = express();
connectToDatabase();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/", routes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
