// src/api.js
const API_URL = import.meta.env.VITE_API_URL;

// Ejemplo de función para obtener usuarios
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

// Ejemplo de función para obtener citas
export async function getCitas() {
  const res = await fetch(`${API_URL}/citas`);
  return res.json();
}
