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

// Conexión a MySQL usando variables de entorno de Railway
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,        // mysql.railway.internal
  user: process.env.MYSQLUSER,        // root
  password: process.env.MYSQLPASSWORD,// contraseña generada por Railway
  database: process.env.MYSQLDATABASE,// railway
  port: process.env.MYSQLPORT || 3306 // usar MYSQLPORT, no DB_PORT
});

// Verificación de conexión sin bloquear el servidor
connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:");
    console.error("Código:", err.code);
    console.error("Mensaje:", err.message);
    console.error("Stack:", err.stack);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Ruta raíz para verificar que el backend está vivo
app.get("/", (req, res) => {
  res.send("Mediweb backend está corriendo en Railway");
});

// Importar rutas y pasar la conexión
try {
  const usuariosRoutes = require("./routes/usuarios")(connection);
  const citasRoutes = require("./routes/citas")(connection);

  app.use("/usuarios", usuariosRoutes);
  app.use("/citas", citasRoutes);
} catch (err) {
  console.error("Error cargando las rutas:", err.message);
}

// Escuchar en el puerto asignado por Railway
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
