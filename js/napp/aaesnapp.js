async function encryptMessage(message, key) {
    const keyBuffer = new TextEncoder().encode(key);
    const truncatedKey = keyBuffer.slice(0, 16); // 使用 128 位元 (16 字節) 或 256 位元 (32 字節) 的密鑰

    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        truncatedKey,
        {
            name: 'AES-CBC',
            length: 128,
        },
        false,
        ['encrypt']
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'AES-CBC',
            iv: iv,
        },
        keyMaterial,
        new TextEncoder().encode(message)
    );

    const encryptedArray = new Uint8Array(encrypted);
    const combined = new Uint8Array(iv.length + encryptedArray.length);
    combined.set(iv);
    combined.set(encryptedArray, iv.length);

    return btoa(String.fromCharCode.apply(null, combined));
}

async function decryptMessage(encryptedMessage, key) {
    const keyBuffer = new TextEncoder().encode(key);
    const truncatedKey = keyBuffer.slice(0, 16); // 使用 128 位元 (16 字節) 或 256 位元 (32 字節) 的密鑰

    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        truncatedKey,
        {
            name: 'AES-CBC',
            length: 128,
        },
        false,
        ['decrypt']
    );

    const rawData = atob(encryptedMessage);
    const combined = new Uint8Array(new ArrayBuffer(rawData.length));
    for (let i = 0; i < rawData.length; i++) {
        combined[i] = rawData.charCodeAt(i);
    }

    const iv = combined.slice(0, 16);
    const data = combined.slice(16);

    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: 'AES-CBC',
            iv: iv,
        },
        keyMaterial,
        data
    );

    return new TextDecoder().decode(decrypted);
}

// 測試加密和解密
const message = 'Hello, World!';
const secretKey = 'MySecretKey123456'; // 替換成你的私鑰，至少16個字符以上

encryptMessage(message, secretKey)
    .then(encrypted => {
        console.log('加密後:', encrypted);
        return decryptMessage(encrypted, secretKey);
    })
    .then(decrypted => {
        console.log('解密後:', decrypted);
    })
    .catch(error => {
        console.error('錯誤:', error);
    });
