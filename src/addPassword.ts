import fs from 'fs';
import path from 'path';
import { decryptWithPrivateKey, encryptWithPublicKey } from './cryptoUtils';

const PASSWORDS_FILE = path.resolve(__dirname, 'passwords.enc');
const PUBLIC_KEY_FILE = path.resolve(__dirname, 'publicKey.pem');
const PRIVATE_KEY_FILE = path.resolve(__dirname, 'privateKey.pem');

export function addPassword(service: string, username: string, password: string, passphrase: string) {
    const publicKey = fs.readFileSync(PUBLIC_KEY_FILE, 'utf-8');
    const privateKey = fs.readFileSync(PRIVATE_KEY_FILE, 'utf-8');

    let passwords = [];
    if (fs.existsSync(PASSWORDS_FILE)) {
        const encryptedData = fs.readFileSync(PASSWORDS_FILE, 'utf-8');
        const decryptedData = decryptWithPrivateKey(privateKey, encryptedData, passphrase);
        passwords = JSON.parse(decryptedData);
    }

    passwords.push({ service, username, password });

    const encryptedData = encryptWithPublicKey(publicKey, JSON.stringify(passwords));
    fs.writeFileSync(PASSWORDS_FILE, encryptedData, 'utf-8');
}