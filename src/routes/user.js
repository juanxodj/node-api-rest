import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
} from "@controllers/userController";
import auth from "@src/middleware/auth";

const router = express.Router();

router.get("/", auth, index);
router.post("/", auth, store);
router.get("/:id", auth, show);
router.put("/:id", auth, update);
router.delete("/:id", auth, destroy);

export default router;
