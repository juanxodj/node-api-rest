import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import Joi from "joi";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    let data = JSON.parse(JSON.stringify(user));
    data.token = user.generateAuthToken();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.send("An error occured");
  }
});

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

module.exports = router;
