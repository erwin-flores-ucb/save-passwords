import readline from 'readline';
import { listPasswords } from './listPasswords';
import { deletePassword } from './deletePassword';
import { addPassword } from './addPassword';
import { changeMasterPassword } from './changeMasterPassword';
import fs from 'fs';
import path from 'path';
import { generateKeyPair } from './cryptoUtils';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PRIVATE_KEY_FILE = path.resolve(__dirname, 'privateKey.pem');
const PUBLIC_KEY_FILE = path.resolve(__dirname, 'publicKey.pem');

// Check if key files exist, generate them if missing
function initializeKeys() {
  if (!fs.existsSync(PRIVATE_KEY_FILE) || !fs.existsSync(PUBLIC_KEY_FILE)) {
    console.log('Generando par de claves RSA...');
    rl.question('Ingrese una contraseña maestra para proteger las claves: ', (masterPassword) => {
      const { publicKey, privateKey } = generateKeyPair(masterPassword);
      fs.writeFileSync(PUBLIC_KEY_FILE, publicKey, 'utf-8');
      fs.writeFileSync(PRIVATE_KEY_FILE, privateKey, 'utf-8');
      console.log('Par de claves RSA generado correctamente.');
      mainMenu();
    });
  } else mainMenu();
}

initializeKeys();

function mainMenu() {
  console.log(`\n-----------------------------`);
  console.log(`GESTOR DE CONTRASEÑAS`);
  console.log(`-----------------------------`);
  console.log(`[1] Agregar nueva contraseña`);
  console.log(`[2] Ver contraseñas almacenadas`);
  console.log(`[3] Buscar contraseña por servicio`);
  console.log(`[4] Eliminar contraseña`);
  console.log(`[5] Cambiar contraseña maestra`);
  console.log(`[6] Salir`);
  console.log(`Seleccione una opción:`);

  rl.question('> ', (option) => {
    switch (option) {
      case '1':
        rl.question('Ingrese el nombre del servicio: ', (service) => {
          rl.question('Ingrese el usuario o correo: ', (username) => {
            rl.question('Ingrese la contraseña: ', (password) => {
              rl.question('Ingrese la contraseña maestra: ', (masterPassword) => {
                addPassword(service, username, password, masterPassword);
                console.log(`Contraseña para '${service}' guardada correctamente.`);
                mainMenu();
              });
            });
          });
        });
        return;
      case '2':
        rl.question('Ingrese la contraseña maestra: ', (masterPassword) => {
          listPasswords(masterPassword);
          mainMenu();
        });
        break;
      case '3':
        console.log('Función para buscar contraseña por servicio');
        break;
      case '4':
        rl.question('Ingrese el nombre del servicio a eliminar: ', (service) => {
          rl.question('Ingrese la contraseña maestra: ', (masterPassword) => {
            deletePassword(service, masterPassword);
            mainMenu();
          });
        });
        return;
      case '5':
        rl.question('Ingrese la contraseña maestra actual: ', (currentPassword) => {
          rl.question('Ingrese la nueva contraseña maestra: ', (newPassword) => {
            changeMasterPassword(currentPassword, newPassword);
            mainMenu();
          });
        });
        return;
      case '6':
        console.log('Saliendo del programa...');
        rl.close();
        return;
      default:
        console.log('Opción inválida, intente nuevamente.');
    }
    mainMenu();
  });
}