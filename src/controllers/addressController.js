import Address from "@models/address";

const index = async (req, res) => {
  let query = {};
  let options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10,
    select: req.query.select || "",
    sort: req.query.sort || {},
    populate: "user",
  };

  await Address.paginate(query, options)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json({ error: error.message }));
};

export { index };
