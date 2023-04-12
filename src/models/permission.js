import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const permissionSchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);

permissionSchema.plugin(paginate);

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
