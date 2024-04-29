import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Hex.parse('2425345aef1e328f430274826ad110b37c721ac348320f2f');

export function encrypt(data) {
    try {
        const iv = CryptoJS.lib.WordArray.random(8);
        const encrypted = CryptoJS.TripleDES.encrypt(data, key, { iv });
        return iv.toString() + encrypted.toString();
    } catch (error) {
        console.error(error);
    }
}

export function decrypt(encryptedData) {
    try {
        const ivHex = encryptedData.substring(0, 16);
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const encryptedText = encryptedData.substring(16);
        const decrypted = CryptoJS.TripleDES.decrypt(encryptedText, key, { iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error(error);
    }
}