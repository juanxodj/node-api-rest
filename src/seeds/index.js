import connectToDatabase from "./../config/database";
import permissionsUserSeed from "./permissionUser";
import permissionsRoleSeed from "./permissionRole";
import rolesSeed from "./role";

const runSeeds = async () => {
  await connectToDatabase();
  await permissionsUserSeed();
  await permissionsRoleSeed();
  await rolesSeed();
};

runSeeds();
