import express from "express";
import { index } from "../controllers/addressController";

const router = express.Router();

router.get("/", index);

module.exports = router;
