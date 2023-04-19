import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

addressSchema.plugin(paginate);

const Address = model("Address", addressSchema);

export default Address;
