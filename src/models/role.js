import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

//Model Permissions
const P_CREATE = "create role";
const P_READ = "read role";
const P_UPDATE = "update role";
const P_DELETE = "delete role";

//Roles names
const ROL_SUPER_ADMIN = "super admin";
const ROL_ADMIN = "admin";
const ROL_USER = "user";

const roleSchema = new Schema({
  name: { type: String, required: true },
  // permissions: [String],
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
});

roleSchema.plugin(paginate);

const Role = model("Role", roleSchema);

export {
  Role,
  P_CREATE,
  P_READ,
  P_UPDATE,
  P_DELETE,
  ROL_SUPER_ADMIN,
  ROL_ADMIN,
  ROL_USER,
};
