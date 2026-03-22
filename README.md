# 🌿 RenaSer — Gestión de Turnos

Aplicación web fullstack para la gestión de turnos de un Centro Holístico de Argentina llamado **RenaSer**. Permite a los usuarios registrarse, iniciar sesión, reservar turnos dentro del horario de atención y administrarlos desde una vista personalizada.

---

## 🚀 Demo

- **Frontend:** [app-turnos-tau.vercel.app](https://app-turnos-tau.vercel.app)
- **Backend:** [appturnos-production-b130.up.railway.app](https://appturnos-production-b130.up.railway.app)

---

## 📁 Estructura del Proyecto

```
AppTurnos/
├── back/                  # API REST - Node.js + Express + TypeScript
├── front/
│   └── vite-project-pm3/  # Frontend - React + Vite + JavaScript
├── Base de Datos.png       # Diagrama de base de datos
└── HistoriaUser.txt        # Historias de usuario
```

---

## ✨ Funcionalidades

- **Registro e inicio de sesión** con validación de credenciales
- **Reserva de turnos** dentro del horario de atención (lunes a viernes, 10hs a 17hs)
- **Restricción de fines de semana** — sábados y domingos no están disponibles
- **Visualización de turnos** pasados y futuros
- **Cancelación de turnos** con hasta 24 horas de anticipación
- **Confirmación por email** al crear la cuenta
- **Notificación por email** al crear o cancelar un turno

---

## 🛠️ Tecnologías

### Frontend
| Tecnología | Uso |
|---|---|
| React | Librería UI |
| Vite | Bundler |
| React Router DOM | Navegación |
| Formik | Manejo de formularios |
| SweetAlert2 | Alertas y notificaciones |
| CSS Modules | Estilos por componente |

### Backend
| Tecnología | Uso |
|---|---|
| Node.js + Express | Servidor |
| TypeScript | Tipado estático |
| Sequelize | ORM |
| PostgreSQL | Base de datos |
| Nodemailer | Envío de emails |
| JWT | Autenticación |

### Infraestructura
| Servicio | Uso |
|---|---|
| Vercel | Deploy del frontend |
| Railway | Deploy del backend y base de datos |

---

## ⚙️ Instalación local

### Requisitos previos
- Node.js v18+
- PostgreSQL

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarolinaAriza-mind/AppTurnos.git
cd AppTurnos
```

### 2. Configurar el Backend

```bash
cd back
npm install
```

Creá un archivo `.env` en la carpeta `back/` con las siguientes variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=appturnos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
JWT_SECRET=tu_secreto
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_de_app
```

```bash
npm run dev
```

### 3. Configurar el Frontend

```bash
cd front/vite-project-pm3
npm install
```

Creá un archivo `.env` en esa carpeta:

```env
VITE_API_URL=https://appturnos-production-b130.up.railway.app
```

```bash
npm run dev
```

---

## 📋 Historias de Usuario

1. **Autenticación** — El usuario puede registrarse e iniciar sesión con nombre y email
2. **Reserva de turnos** — Puede generar turnos en días y horarios hábiles
3. **Visualización** — Puede ver el listado de sus turnos pasados y futuros
4. **Cancelación** — Puede cancelar turnos con hasta 24hs de anticipación
5. **Restricción fines de semana** — Sábados y domingos no están disponibles
6. **Email de bienvenida** — Recibe un correo al crear su cuenta
7. **Email de turno** — Recibe confirmación al crear o cancelar un turno

---

## 🗄️ Base de Datos

![Diagrama de Base de Datos](./Base%20de%20Datos.png)

---

## 👩‍💻 Autora

**Carolina Ariza**
[GitHub](https://github.com/CarolinaAriza-mind)