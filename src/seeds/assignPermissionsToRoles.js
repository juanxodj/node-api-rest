import Permission from "./../models/permission";
import { Role } from "./../models/role";

const assignPermissionsToRoles = async (req, res) => {
  let data = [];
  const permissions = await Permission.find();
  for (const permission of permissions) {
    data.push(permission._id);
  }

  await Role.findOneAndUpdate({ name: "admin" }, { permissions: data });
};

export default assignPermissionsToRoles;
