import Permission from "../models/permission";
import { P_CREATE, P_READ, P_UPDATE, P_DELETE } from "../models/user";

const data = [
  { name: P_CREATE },
  { name: P_READ },
  { name: P_UPDATE },
  { name: P_DELETE },
];

const permissionsUserSeed = async () => {
  for (const permission of data) {
    const perm = await Permission.findOne({ name: permission.name });
    if (perm) {
      console.log(`Permiso '${permission.name}' ya existe`);
    } else {
      await Permission.create(permission);
      console.log(`Permiso '${permission.name}' creado`);
    }
  }
};

export default permissionsUserSeed;
