import fs from 'fs';
import path from 'path';
import { decryptWithPrivateKey, encryptWithPublicKey, generateKeyPair } from './cryptoUtils';

const PASSWORDS_FILE = path.resolve(__dirname, 'passwords.enc');
const PRIVATE_KEY_FILE = path.resolve(__dirname, 'privateKey.pem');
const PUBLIC_KEY_FILE = path.resolve(__dirname, 'publicKey.pem');

export function changeMasterPassword(currentPassword: string, newPassword: string) {
    if (!fs.existsSync(PASSWORDS_FILE)) {
        console.log('No hay contraseñas almacenadas.');
        return;
    }

    const privateKey = fs.readFileSync(PRIVATE_KEY_FILE, 'utf-8');
    const encryptedData = fs.readFileSync(PASSWORDS_FILE, 'utf-8');

    try {
        const decryptedData = decryptWithPrivateKey(privateKey, encryptedData, currentPassword);
        const passwords = JSON.parse(decryptedData);

        // Generate new key pair with the new password
        const { publicKey, privateKey: newPrivateKey } = generateKeyPair(newPassword);

        // Re-encrypt passwords with the new public key
        const encryptedUpdatedData = encryptWithPublicKey(publicKey, JSON.stringify(passwords));

        // Save updated keys and encrypted passwords
        fs.writeFileSync(PUBLIC_KEY_FILE, publicKey, 'utf-8');
        fs.writeFileSync(PRIVATE_KEY_FILE, newPrivateKey, 'utf-8');
        fs.writeFileSync(PASSWORDS_FILE, encryptedUpdatedData, 'utf-8');

        console.log('Contraseña maestra actualizada correctamente.');
    } catch (error) {
        console.error('Error al cambiar la contraseña maestra:', error);
    }
}