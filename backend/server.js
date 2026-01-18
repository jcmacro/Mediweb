// Importación de módulos
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Inicialización de la app
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MySQL usando variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Verificación de conexión
connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// Ruta raíz para verificar que el backend está vivo
app.get("/", (req, res) => {
  res.send("Mediweb backend está corriendo en Railway");
});

// Importar rutas y pasar la conexión
const usuariosRoutes = require("./routes/usuarios")(connection);
const citasRoutes = require("./routes/citas")(connection);

app.use("/usuarios", usuariosRoutes);
app.use("/citas", citasRoutes);

// Escuchar en el puerto asignado por Railway
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
