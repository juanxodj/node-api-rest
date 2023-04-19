import express from "express";
import { index } from "@controllers/addressController";

const router = express.Router();

router.get("/", index);

export default router;
