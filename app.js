import "module-alias/register";
import express from "express";
import cors from "cors";

import connectToDatabase from "@src/config/database";
import routes from "@src/routes";
import userRoutes from "@src/routes/user";
import addressRoutes from "@src/routes/address";
import authRoutes from "@src/routes/auth";
import afipRoutes from "@src/routes/afip";
import { PORT } from "@src/config/env";

const app = express();
connectToDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/", routes);
app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/auth", authRoutes);
app.use("/afip", afipRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Listen port ${PORT}`);
});
