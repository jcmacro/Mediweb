const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Solicitar cita
  router.post("/solicitar", (req, res) => {
    const { usuario_id, especialidad, fecha, hora, motivo } = req.body;
    const sql = "INSERT INTO citas (usuario_id, especialidad, fecha, hora, motivo) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [usuario_id, especialidad, fecha, hora, motivo], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: "Cita registrada correctamente", id: result.insertId });
    });
  });

  // Listar citas de un usuario
  router.get("/:usuario_id", (req, res) => {
    const { usuario_id } = req.params;
    const sql = "SELECT * FROM citas WHERE usuario_id = ?";
    db.query(sql, [usuario_id], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  });

  return router;
};
