const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Registro de usuario
  router.post("/registro", (req, res) => {
    const { nombre, cedula, correo, telefono, password, rol } = req.body;
    const sql = "INSERT INTO usuarios (nombre, cedula, correo, telefono, password, rol) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [nombre, cedula, correo, telefono, password, rol || "paciente"], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ mensaje: "Usuario registrado correctamente", id: result.insertId });
    });
  });

  // Login de usuario
  router.post("/login", (req, res) => {
    const { correo, password } = req.body;
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    db.query(sql, [correo, password], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length > 0) {
        res.json({ mensaje: "Login exitoso", usuario: results[0] });
      } else {
        res.status(401).json({ mensaje: "Credenciales inválidas" });
      }
    });
  });

  return router;
};
