// 產生 RSA 金鑰對
async function generateKeyPair() {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// 加密函數
async function encryptMessageWithPublicKey(message, publicKey) {
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP",
        },
        publicKey,
        new TextEncoder().encode(message)
    );

    return btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)));
}

// 解密函數
async function decryptMessageWithPrivateKey(encryptedMessage, privateKey) {
    const rawData = atob(encryptedMessage);
    const encryptedData = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        encryptedData[i] = rawData.charCodeAt(i);
    }

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "RSA-OAEP",
        },
        privateKey,
        encryptedData
    );

    return new TextDecoder().decode(decrypted);
}

// 測試加密和解密
const message = 'Hello, World!';

generateKeyPair()
    .then(keyPair => {
        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.privateKey;

        encryptMessageWithPublicKey(message, publicKey)
            .then(encrypted => {
                console.log('加密後:', encrypted);
                return decryptMessageWithPrivateKey(encrypted, privateKey);
            })
            .then(decrypted => {
                console.log('解密後:', decrypted);
            })
            .catch(error => {
                console.error('錯誤:', error);
            });
    })
    .catch(error => {
        console.error('金鑰產生錯誤:', error);
    });