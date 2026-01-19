// URL base de la API
// Producción: https://mediweb-production.up.railway.app
// Local: http://localhost:3000
const API_URL = "https://mediweb-production.up.railway.app";

// 
// LOGIN
// 
const loginForm = document.querySelector("form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.mensaje || "Inicio de sesión exitoso");
      // Aquí podrías redirigir al panel: window.location.href = "panel.html";
    } catch (error) {
      console.error("Error en login:", error);
      alert("No se pudo iniciar sesión");
    }
  });
}

// 
// REGISTRO DE USUARIO
// 
const registroForm = document.getElementById("registroForm");
if (registroForm) {
  registroForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`${API_URL}/usuarios/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.mensaje || "Usuario registrado con éxito");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("No se pudo registrar el usuario");
    }
  });
}

// 
// SOLICITUD DE CITA
// 
const citaForm = document.getElementById("citaForm");
if (citaForm) {
  citaForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch(`${API_URL}/citas/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.mensaje || "Cita solicitada con éxito");
    } catch (error) {
      console.error("Error al solicitar cita:", error);
      alert("No se pudo solicitar la cita");
    }
  });
}

// 
// PANEL DE CITAS
// 
async function cargarCitas(usuarioId) {
  try {
    const response = await fetch(`${API_URL}/citas/${usuarioId}`);
    const citas = await response.json();

    const tabla = document.getElementById("tablaCitas");
    if (!tabla) return;

    tabla.innerHTML = ""; // Limpia la tabla antes de llenarla

    citas.forEach((cita) => {
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
  } catch (error) {
    console.error("Error al cargar citas:", error);
    alert("No se pudieron cargar las citas");
  }
}

async function cancelarCita(idCita) {
  try {
    const response = await fetch(`${API_URL}/citas/cancelar/${idCita}`, {
      method: "PUT"
    });

    const result = await response.json();
    alert(result.mensaje || "Cita cancelada");

    // Aquí se recarga las citas del usuario actual
    // cargarCitas(usuarioId);
  } catch (error) {
    console.error("Error al cancelar cita:", error);
    alert("No se pudo cancelar la cita");
  }
}
