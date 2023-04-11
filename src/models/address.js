import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

addressSchema.plugin(paginate);

const Address = mongoose.model("Address", addressSchema);

export default Address;
