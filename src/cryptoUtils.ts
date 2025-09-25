import crypto from 'crypto';

// Generar claves públicas y privadas con una contraseña maestra
export function generateKeyPair(masterPassword: string) {
    // const salt = crypto.randomBytes(16);
    // const derivedKey = crypto.pbkdf2Sync(masterPassword, salt, 100000, 32, 'sha256');

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: masterPassword
            // passphrase: derivedKey.toString('hex')
        }
    });
    return { publicKey, privateKey };
}

// Cifrar datos con clave pública
export function encryptWithPublicKey(publicKey: string, data: string): string {
    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        },
        Buffer.from(data)
    );
    return encryptedData.toString('base64');
}

// Descifrar datos con clave privada
export function decryptWithPrivateKey(privateKey: string, encryptedData: string, passphrase: string): string {
    const decryptedData = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
            passphrase: passphrase
        },
        Buffer.from(encryptedData, 'base64')
    );
    return decryptedData.toString();
}