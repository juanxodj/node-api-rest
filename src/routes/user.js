import express from "express";
import {
  index,
  store,
  show,
  update,
  destroy,
  factory,
} from "../controllers/userController";
/* import db from "./../../mysqlConfig"; */

const router = express.Router();

router.get("/", index);
router.post("/", store);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get("/factory/users", factory);

//MYSQL EXAMPLE
/* router.get("/api/users", (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "Hubo un error al obtener los registros." });
      return;
    }

    res.json(rows);
  });
});

router.post("/api/users", (req, res) => {
  const { code, name, email, password } = req.body;
  const sql = `INSERT INTO users (code, name, email, password) VALUES ('${code}', '${name}', '${email}', '${password}')`;

  db.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Hubo un error al crear el registro." });
      return;
    }
    res.json({
      id: result.insertId,
      ...req.body,
    });
  });
}); */

module.exports = router;
