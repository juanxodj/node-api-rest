import Address from "../models/address";

const index = async (req, res) => {
  try {
    const address = await Address.find();
    res.send(address);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { index };
