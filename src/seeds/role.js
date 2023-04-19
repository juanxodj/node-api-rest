import { Role, ROL_SUPER_ADMIN, ROL_ADMIN, ROL_USER } from "@models/role";

const data = [
  { name: ROL_SUPER_ADMIN },
  { name: ROL_ADMIN },
  { name: ROL_USER },
];

const rolesSeed = async () => {
  for (const role of data) {
    const perm = await Role.findOne({ name: role.name });
    if (perm) {
      console.log(`Rol '${role.name}' ya existe`);
    } else {
      await Role.create(role);
      console.log(`Rol '${role.name}' creado`);
    }
  }
};

export default rolesSeed;
