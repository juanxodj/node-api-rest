import bcrypt from "bcrypt";
import Address from "@models/address";
import { User, validate } from "@models/user";
import { Role } from "@models/role";
import Permission from "@models/permission";
import { faker } from "@faker-js/faker";

// Obtener todos los usuarios
const index = async (req, res) => {
  let query = {};
  let options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    select: req.query.select || "",
    sort: req.query.sort || {},
    populate: ["addresses", "role"],
  };

  // Example query 'name:juan|email:gmail'
  if (req.query.query) {
    const text = req.query.query;
    query = text.split("|").reduce((acc, pair) => {
      const [key, value] = pair.split(":");
      acc[key] = { $regex: new RegExp(value), $options: "i" };
      return acc;
    }, {});
  }

  await User.paginate(query, options)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json({ error: error.message }));
};

// Crear un nuevo usuario
const store = async (req, res) => {
  try {
    // Validación
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const { code, name, email, password } = req.body;

    // Hash de la contraseña usando bcrypt
    const role = await Role.findOne({ name: req.body.role });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      code,
      name,
      email,
      role: role._id,
      password: hash,
    });
    const addresses = req.body.addresses || [];
    const addressesIds = [];

    for (const address of addresses) {
      const newAddress = await Address.create({
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        user: user._id,
      });
      addressesIds.push(newAddress._id);
    }

    await User.findByIdAndUpdate(user._id, {
      addresses: addressesIds,
    });

    const userNew = await User.findById(user._id)
      .populate("addresses")
      .populate("role");

    res.json(userNew);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario por su ID
const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({ path: "addresses", select: "-user" })
      .populate({
        path: "role",
        populate: {
          path: "permissions",
          model: Permission,
          //select: "name -_id",
          transform: (doc) => {
            return doc.name;
          },
        },
      });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// Actualizar un usuario
const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// Eliminar un usuario
const destroy = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

const factory = async () => {
  await User.deleteMany({});
  const roleSuperAdmin = await Role.findOne({ name: "super admin" });
  const roleAdmin = await Role.findOne({ name: "admin" });
  const roleUser = await Role.findOne({ name: "user" });
  try {
    for (let i = 1; i <= 100; i++) {
      const hash = await bcrypt.hash("123456", 10);
      const roleId =
        i === 1 ? roleSuperAdmin._id : i === 2 ? roleAdmin._id : roleUser._id;
      const data = {
        code: i,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: hash,
        role: roleId,
      };
      await User.create(data);
    }
    console.log("Data users generation completed");
  } catch (error) {
    console.log(error.message);
  }
};

export { index, show, store, update, destroy, factory };
