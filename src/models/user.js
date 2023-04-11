import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import jwt from "jsonwebtoken";
import Joi from "joi";

const P_CREATE = "create user";
const P_READ = "read user";
const P_UPDATE = "update user";
const P_DELETE = "delete user";

const userSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "secretkey");
  return token;
};

userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

const validate = (user) => {
  const schema = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    addresses: Joi.array().optional().items({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
    }),
  });
  return schema.validate(user);
};

module.exports = { User, validate, P_CREATE, P_READ, P_UPDATE, P_DELETE };
