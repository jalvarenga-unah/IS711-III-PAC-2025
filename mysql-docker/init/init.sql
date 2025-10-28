-- Eliminar tablas si existieran (útil para desarrollo)
DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS users;

-- Crear tabla de usuarios con UUID en BINARY(16)
CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  must_change_password BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de TODOs (user_id opcional)
CREATE TABLE todos (
  id CHAR(36) PRIMARY KEY,                 -- UUID en formato texto
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  user_id BINARY(16) NULL,                 -- ahora es opcional
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insertar usuario de ejemplo
SET @user_bin_id = UUID_TO_BIN(UUID());

INSERT INTO users (id, name, email, phone, password_hash, must_change_password)
VALUES (
  @user_bin_id,
  'Juan Alvarenga',
  'jealvarengar@unah.edu.hn',
  '+50499999999',
  '$2y$10$secrethash',
  TRUE
);

SET @todo_id1 = UUID();

INSERT INTO todos (id, title, description, completed, user_id)
VALUES (
  @todo_id1,
  'Preparar API para añadir usuarios a los endpoints',
  'Ahora las tareas guardarán que usuario las creó',
  FALSE,
  NULL
);

