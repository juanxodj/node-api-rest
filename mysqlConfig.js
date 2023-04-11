import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "seguriper_kontrolle",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión: " + err.stack);
    return;
  }

  console.log("Conexión a la base de datos establecida con éxito.");
});

module.exports = db;
