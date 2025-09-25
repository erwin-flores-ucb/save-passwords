import fs from 'fs';
import path from 'path';
import { decryptWithPrivateKey } from './cryptoUtils';

const PASSWORDS_FILE = path.resolve(__dirname, 'passwords.enc');
const PRIVATE_KEY_FILE = path.resolve(__dirname, 'privateKey.pem');

// Agregar mensajes de depuración para verificar la clave privada y la passphrase
export function listPasswords(masterPassword: string) {
    if (!fs.existsSync(PASSWORDS_FILE)) {
        console.log('No hay contraseñas almacenadas.');
        return [];
    }

    const encryptedData = fs.readFileSync(PASSWORDS_FILE, 'utf-8');
    const privateKey = fs.readFileSync(PRIVATE_KEY_FILE, 'utf-8');

    console.log('Clave privada cargada correctamente.');
    console.log('Passphrase proporcionada:', masterPassword);

    try {
        const decryptedData = decryptWithPrivateKey(privateKey, encryptedData, masterPassword);
        const passwords = JSON.parse(decryptedData);
        console.table(passwords);
        return passwords;
    } catch (error) {
        console.error('Error al descifrar las contraseñas');
        return [];
    }
}