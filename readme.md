# Alien Bar Website (Backend) - ISDI Coders Madrid

**Desarrollo por:** Alejandro Irastorza Leal

## Descripción

El backend de Alien Bar es una parte fundamental del sistema, proporcionando servicios y lógica de negocio para la gestión del menú y la autenticación de usuarios.

## Características principales

- **Gestión del Menú:** Ofrece endpoints para agregar, editar o eliminar productos del menú.
- **Autenticación de Usuarios:** Proporciona funcionalidades para el registro, inicio de sesión y generación de tokens JWT.
- **Almacenamiento de Archivos:** Implementa la carga de archivos para imágenes de productos utilizando Cloudinary.

## Tecnologías utilizadas

### Frameworks y Bibliotecas Principales

- **Express:** v4.18.2 - Framework web rápido y minimalista para Node.js.
- **Mongoose:** v8.0.1 - Biblioteca de modelado de objetos para MongoDB.
- **Joi:** v17.11.0 - Validación de datos en JavaScript.
- **Express-Validation:** v4.1.0 - Middleware de validación para Express.

### Autenticación y Seguridad

- **JSON Web Token (jsonwebtoken):** v9.0.2 - Implementa la generación y validación de tokens JWT para la autenticación de usuarios.
- **Bcrypt:** v5.1.1 - Biblioteca para el hashing de contraseñas.

### Almacenamiento y Middleware

- **Cloudinary:** v1.41.0 - Plataforma de almacenamiento en la nube para la gestión de imágenes.
- **Multer:** v1.4.5-lts.1 - Middleware para manejar la carga de archivos en Node.js.

### Herramientas y Testing

- **Jest:** v29.7.0 - Framework de pruebas para JavaScript.
- **Nodemon:** v3.0.1 - Herramienta para reiniciar automáticamente la aplicación Node.js al detectar cambios en el código.

### Linting y Estilo de Código

- **ESLint:** v8.51.0 - Herramienta para identificar y reportar patrones en el código ECMAScript/JavaScript.
- **Prettier:** Configurado para mantener un estilo de código consistente.
