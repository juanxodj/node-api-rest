import { User } from "@models/user";
import { Role } from "@models/role";

const hasPermission = (permissions) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("role");
    if (!user.role) {
      throw new Error("No role found for user");
    }

    const allowed = permissions.every((permission) =>
      user.role.permissions.includes(permission)
    );
    if (!allowed) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default hasPermission;
