import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
});

userSchema.plugin(paginate);

const User = mongoose.model("User", userSchema);

export default User;
