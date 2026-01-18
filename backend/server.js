const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",             // usuario MySQL
  password: "kinyan123",    // contraseña MySQL
  database: "mediweb"       // nombre del schema
});

db.connect(err => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Importar rutas
const usuariosRoutes = require("./routes/usuarios")(db);
const citasRoutes = require("./routes/citas")(db);

app.use("/usuarios", usuariosRoutes);
app.use("/citas", citasRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
