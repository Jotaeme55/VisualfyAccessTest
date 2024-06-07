# VisualfyAccessTest

Este proyecto está designado para ser la prueba de acceso con la empresa Visualfy y el proyecto consta de lo siguiente:

Estructura General del Proyecto
Funcionalidades
Roles de Usuario:

Admin: Capaz de enviar alertas a los usuarios y ver todas las alertas enviadas, por ultimo tambien podra ver un registro de los logs en el proyecto.
Usuario: Recibe alertas y puede ver las alertas recibidas.
Alertas:

Envío de alertas de diferentes tipos (por ejemplo, incendio, intrusión, etc.).
Visualización de alertas recibidas por cada usuario.
Visualización de todas las alertas enviadas (para el admin).
Accesibilidad:

Implementación de buenas prácticas de accesibilidad tanto en la interfaz del admin como en la del usuario.
Despliegue y Tests:

Instrucciones claras para desplegar en local.
Implementación de tests tanto en el frontend como en el backend.
Tecnologías Utilizadas
Frontend:

Framework: Vue.js 3
Librería de Estado: Vuex
Enrutador: Vue Router
HTTP: Fetch API
Gráficos: Chart.js (opcional para mostrar estadísticas)
Backend:

Framework: Express.js
Almacenamiento de Datos: Archivos JSON (alerts.json, priority.json)
WebSockets: socket.io (para notificaciones en tiempo real)
Logs: winston
