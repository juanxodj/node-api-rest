import connectToDatabase from "./../config/database";
import permissionsUserSeed from "./permissionUser";
import permissionsRoleSeed from "./permissionRole";
import rolesSeed from "./role";
import assignPermissionsToRoles from "./assignPermissionsToRoles";
import { factory as factoryUsers } from "./../controllers/userController";

const runSeeds = async () => {
  await connectToDatabase();
  await permissionsUserSeed();
  await permissionsRoleSeed();
  await rolesSeed();
  await assignPermissionsToRoles();
  await factoryUsers();
};

runSeeds();
