# Mediweb

## Descripción
Mediweb es una aplicación web que integra un **frontend** desplegado en Vercel y un **backend** alojado en Railway con base de datos MySQL.  
Su objetivo es permitir el **registro** y **login** de usuarios, gestionando roles como *paciente* y *administrador*.

---

## Arquitectura
- **Frontend**: HTML, CSS y JavaScript, desplegado en **Vercel**.  
- **Backend**: Node.js con Express, desplegado en **Railway**.  
- **Base de datos**: MySQL en Railway.  

---

## Conexión Railway ↔ Vercel
La comunicación entre ambos servicios se realiza mediante **endpoints HTTP**:

- Railway provee el motor y la base de datos, exponiendo un endpoint público como:  

https://mediweb-production.up.railway.app
- Vercel ofrece la interfaz pública.  
- En el frontend se configura la variable `API_URL` para apuntar al backend en Railway.  
- Cuando un usuario llena un formulario en la página, el `scripts.js` envía la información al backend, que procesa la petición y responde.

En términos simples: **Railway es el motor, Vercel es la vitrina.** El usuario interactúa con Vercel, y este se comunica con Railway de manera transparente.

---

## ⚙️ Instalación local
1. Clonar el repositorio:
 ```bash
 git clone <URL-del-repo>


##Instalar dependencias:
npm install

##Configurar variables de entorno para la base de datos (host, usuario, contraseña, nombre, puerto).

##Ejecutar el backend:

npm start

Abrir el frontend en el navegador.
