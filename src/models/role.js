import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const roleSchema = new mongoose.Schema({
  name: String,
  permissions: [String],
});

roleSchema.plugin(paginate);

const Role = mongoose.model("Role", roleSchema);

export default Role;
