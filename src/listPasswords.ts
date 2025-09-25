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

// Implementar la función para buscar contraseñas por servicio
export function findPasswordByService(service: string, masterPassword: string) {
    if (!fs.existsSync(PASSWORDS_FILE)) {
        console.log('No hay contraseñas almacenadas.');
        return null;
    }

    const encryptedData = fs.readFileSync(PASSWORDS_FILE, 'utf-8');
    const privateKey = fs.readFileSync(PRIVATE_KEY_FILE, 'utf-8');

    try {
        const decryptedData = decryptWithPrivateKey(privateKey, encryptedData, masterPassword);
        const passwords = JSON.parse(decryptedData);
        const foundPassword = passwords.find((entry: { service: string }) => entry.service === service);

        if (foundPassword) {
            return foundPassword;
        } else {
            console.log('No se encontró ninguna contraseña para el servicio:', service);
            return null;
        }
    } catch (error) {
        console.error('Error al descifrar las contraseñas:', error);
        return null;
    }
}