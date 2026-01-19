// Importación de módulos
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Inicialización de la app
const app = express();
const PORT = process.env.PORT; // usar SIEMPRE el puerto de Railway

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MySQL usando SOLO variables MYSQL* de Railway
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306
});

// Verificación de conexión sin bloquear el servidor
connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:");
    console.error("Código:", err.code);
    console.error("Mensaje:", err.message);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Ruta para verificar que las variables están llegando
app.get("/env-check", (req, res) => {
  res.json({
    MYSQLHOST: process.env.MYSQLHOST,
    MYSQLUSER: process.env.MYSQLUSER,
    MYSQLPASSWORD: process.env.MYSQLPASSWORD ? "****" : null,
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    MYSQLPORT: process.env.MYSQLPORT
  });
});

// Ruta raíz para verificar que el backend está vivo
app.get("/", (req, res) => {
  res.send("✅ Mediweb backend está corriendo en Railway");
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
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
