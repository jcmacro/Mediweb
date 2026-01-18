// Definir la URL base de la API
// En producción: https://mediweb-production.up.railway.app
// En local: http://localhost:3000
const API_URL = "https://mediweb-production.up.railway.app";

// Captura el formulario de login
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault(); // evita que se recargue la página
  alert("Inicio de sesión simulado. Aquí irá la lógica real.");
});

// Captura el formulario de registro
document.getElementById("registroForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // evita recarga
  const formData = new FormData(e.target); 
  const data = Object.fromEntries(formData); 

  // Envía los datos al backend
  const response = await fetch(`${API_URL}/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.mensaje);
});

// Formulario de solicitud de cita
document.getElementById("citaForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const response = await fetch(`${API_URL}/citas/solicitar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  alert(result.mensaje);
});

// Carga de citas en el panel 
async function cargarCitas(usuarioId) {
  const response = await fetch(`${API_URL}/citas/${usuarioId}`);
  const citas = await response.json();

  const tabla = document.getElementById("tablaCitas");
  tabla.innerHTML = "";

  citas.forEach(cita => {
    const fila = `
      <tr>
        <td>${cita.especialidad}</td>
        <td>${cita.fecha}</td>
        <td>${cita.hora}</td>
        <td>${cita.estado}</td>
        <td><button onclick="cancelarCita(${cita.id_cita})">Cancelar</button></td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

async function cancelarCita(idCita) {
  const response = await fetch(`${API_URL}/citas/cancelar/${idCita}`, {
    method: "PUT"
  });
  const result = await response.json();
  alert(result.mensaje);
  // Recargar citas después de cancelar
}
