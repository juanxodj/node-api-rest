import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const permissionSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

permissionSchema.plugin(paginate);

const Permission = model("Permission", permissionSchema);

export default Permission;
