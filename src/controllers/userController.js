import bcrypt from "bcrypt";
import Address from "../models/address";
import { User, validate } from "./../models/user";
import { faker } from "@faker-js/faker";

// Obtener todos los usuarios
const index = async (req, res) => {
  let query = {};
  let options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    select: req.query.select || "",
    sort: req.query.sort || {},
    populate: ["addresses"],
  };

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
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const { code, name, email, password } = req.body;

    // Hash de la contraseña usando bcrypt
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ code, name, email, password: hash });

    const addresses = req.body.addresses || [];
    for (const address of addresses) {
      await createAddress(
        address.street,
        address.city,
        address.state,
        address.zipCode,
        user._id
      );
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function createAddress(street, city, state, zipCode, userId) {
  const address = new Address({
    street,
    city,
    state,
    zipCode,
    user: userId,
  });
  await address.save();
}

// Obtener un usuario por su ID
const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("addresses");
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

// Actualizar un usuario
const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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

const factory = async (req, res) => {
  try {
    for (let i = 1; i <= 100; i++) {
      const data = {
        code: i,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      const user = await User.create(data);
      console.log(user);
    }
    res.json({ message: "Data generation completed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { index, show, store, update, destroy, factory };
