# ✅ Proyecto - `todos_unah`

Este proyecto configura un contenedor de **MySQL 8** usando Docker e incluye un script de inicialización con tablas para **usuarios** y **TODOs**, pensado para la elaboración de un **API RESTful** y la gestión de tareas.

---

## 🚀 Instrucciones para iniciar

### 1. Requisitos

Asegúrate de tener instalado:

- [Docker](https://www.docker.com/)

### 2. Levantar el contenedor

Desde la raíz del proyecto donde se encuentra el archivo `docker-compose.yml`, ejecuta:

```bash
docker compose up -d
```

Esto iniciará un contenedor MySQL con:

- Base de datos inicial: `todos_unah`
- Datos precargados (usuarios y TODOs de ejemplo)
- Tablas configuradas correctamente

---

## 🔐 Datos de conexión

Conéctate a la base de datos desde tu API, Workbench o cualquier cliente MySQL:

| Parámetro       | Valor          |
|-----------------|----------------|
| Host            | `localhost`    |
| Puerto          | `3307`         |
| Base de datos   | `todos_unah`   |
| Usuario         | `unah`         |
| Contraseña      | `unah1234`     |
| Usuario root    | `root`         |
| Contraseña root | `unah1234`     |

> ⚠️ El puerto `3307` se mantiene para evitar conflictos con instalaciones locales de MySQL.

---

## 🗂 Estructura del proyecto

```
.
├── docker-compose.yml         # Configuración de servicios Docker
├── init/
│   └── init.sql               # Script SQL para crear e insertar datos
├── README.md
```

---

## 🧱 Tablas creadas

### `users`
| Campo                  | Tipo           | Descripción                           |
|------------------------|----------------|----------------------------------------|
| `id`                   | BINARY(16)     | UUID binario como PK                   |
| `name`                 | VARCHAR(100)   | Nombre del usuario                     |
| `email`                | VARCHAR(255)   | Correo electrónico (único)             |
| `phone`                | VARCHAR(20)    | Número de teléfono                     |
| `password_hash`        | VARCHAR(255)   | Contraseña en hash (bcrypt)            |
| `must_change_password` | BOOLEAN        | Forzar cambio de contraseña            |
| `created_at`           | TIMESTAMP      | Fecha de creación                      |

---

### `todos`
| Campo        | Tipo         | Descripción                                           |
|--------------|--------------|-------------------------------------------------------|
| `id`         | CHAR(36)     | UUID como texto (ej. `UUID()`)                        |
| `title`      | VARCHAR(255) | Título de la tarea                                    |
| `description`| TEXT         | Descripción / detalles                                |
| `completed`  | BOOLEAN      | Indica si la tarea está completada (DEFAULT FALSE)    |
| `user_id`    | BINARY(16)   | (Opcional) FK a `users.id`; puede ser NULL           |
| `created_at` | TIMESTAMP    | Fecha de creación                                     |


---

## 🔍 Consultas útiles

### Ver todos los TODOs (con información de usuario si existe)
```sql
SELECT
  t.id AS todo_id,
  t.title,
  t.description,
  t.completed,
  t.created_at AS todo_created,
  COALESCE(BIN_TO_UUID(u.id), NULL) AS user_uuid,
  u.name AS user_name,
  u.email AS user_email
FROM todos t
LEFT JOIN users u ON u.id = t.user_id;
```

### Ver TODOs sin usuario asignado
```sql
SELECT id, title, description, completed, created_at
FROM todos
WHERE user_id IS NULL;
```

### Ver TODOs de un usuario (por UUID legible)
```sql
SELECT
  t.id, t.title, t.description, t.completed, t.created_at
FROM todos t
JOIN users u ON u.id = t.user_id
WHERE BIN_TO_UUID(u.id) = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
```

### Marcar un TODO como completado
```sql
UPDATE todos
SET completed = TRUE
WHERE id = 'uuid-del-todo';
```

### Insertar un TODO desde SQL (sin usuario)
```sql
INSERT INTO todos (id, title, description, completed, user_id)
VALUES (UUID(), 'Título de ejemplo', 'Descripción...', FALSE, NULL);
```

### Insertar un TODO desde SQL (con usuario)
```sql
-- asumiendo que @user_bin_id ya contiene UUID_TO_BIN(...) del usuario
INSERT INTO todos (id, title, description, completed, user_id)
VALUES (UUID(), 'Tarea con usuario', 'Descripción...', FALSE, @user_bin_id);
```
