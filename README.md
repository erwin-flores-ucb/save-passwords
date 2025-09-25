# Gestor de Contraseñas

Este proyecto es un gestor de contraseñas que permite almacenar, buscar, listar, eliminar y proteger contraseñas utilizando cifrado RSA. Las claves públicas y privadas se generan y protegen con una contraseña maestra.

## Características

- **Agregar Contraseña**: Permite agregar una nueva contraseña asociada a un servicio y usuario.
- **Listar Contraseñas**: Muestra todas las contraseñas almacenadas (después de descifrarlas).
- **Buscar Contraseña por Servicio**: Busca una contraseña específica asociada a un servicio.
- **Eliminar Contraseña**: Elimina una contraseña asociada a un servicio.
- **Cambiar Contraseña Maestra**: Permite cambiar la contraseña maestra y re-cifrar las contraseñas existentes.

## Requisitos

- Node.js (v14 o superior)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd <NOMBRE_DEL_PROYECTO>
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Ejecuta el programa:
   ```bash
   npm run start
   ```

2. Sigue las instrucciones en el menú interactivo para realizar las operaciones deseadas.

## Archivos Clave

- `src/addPassword.ts`: Función para agregar nuevas contraseñas.
- `src/listPasswords.ts`: Funciones para listar y buscar contraseñas.
- `src/deletePassword.ts`: Función para eliminar contraseñas.
- `src/changeMasterPassword.ts`: Función para cambiar la contraseña maestra.
- `src/cryptoUtils.ts`: Utilidades para el cifrado y descifrado de datos.

## Seguridad

- Las contraseñas se almacenan cifradas en el archivo `passwords.enc`.
- Las claves públicas y privadas se almacenan en los archivos `publicKey.pem` y `privateKey.pem` respectivamente.
- La clave privada está protegida con una contraseña maestra.

## Contribución

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Sube tus cambios:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.