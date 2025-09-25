import fs from 'fs';
import path from 'path';
import { decryptWithPrivateKey, encryptWithPublicKey } from './cryptoUtils';

const PASSWORDS_FILE = path.resolve(__dirname, 'passwords.enc');
const PRIVATE_KEY_FILE = path.resolve(__dirname, 'privateKey.pem');
const PUBLIC_KEY_FILE = path.resolve(__dirname, 'publicKey.pem');

export function deletePassword(service: string, masterPassword: string) {
    if (!fs.existsSync(PASSWORDS_FILE)) {
        console.log('No hay contraseñas almacenadas.');
        return;
    }

    const encryptedData = fs.readFileSync(PASSWORDS_FILE, 'utf-8');
    const privateKey = fs.readFileSync(PRIVATE_KEY_FILE, 'utf-8');
    const publicKey = fs.readFileSync(PUBLIC_KEY_FILE, 'utf-8');

    try {
        const decryptedData = decryptWithPrivateKey(privateKey, encryptedData, masterPassword);
        const passwords = JSON.parse(decryptedData);

        const updatedPasswords = passwords.filter((password: { service: string }) => password.service !== service);

        const encryptedUpdatedData = encryptWithPublicKey(publicKey, JSON.stringify(updatedPasswords));
        fs.writeFileSync(PASSWORDS_FILE, encryptedUpdatedData, 'utf-8');

        console.log(`Contraseña para el servicio '${service}' eliminada correctamente.`);
    } catch (error) {
        console.error('Error al eliminar la contraseña:', error);
    }
}