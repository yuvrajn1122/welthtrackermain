// EncryptionUtility.jsx

const PASSWORD = 'i2iMvwi2yg1Kz1//xjLCMRpMon9tS0KraglnfE5JelSlLKRKdw1HK706WAe+UYrr/JggZy5c4rB4KHhDClgMYlYuHofBbp6THKwDFSlye/NyetS6fqpDrkU1glgT5YtPihvULw==';
const PBKDF2_ITERATIONS = 10000;
const AES_KEY_LENGTH = 256; // Bits
const SALT_LENGTH = 16; // Bytes
const IV_LENGTH = 12; // Bytes
const HMAC_KEY_LENGTH = 256; // Bits

// Utility: Generate random bytes
const generateRandomBytes = (length) => window.crypto.getRandomValues(new Uint8Array(length));

// Utility: Derive AES Key
const deriveKey = async (password, salt) => {
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: AES_KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
};

// Utility: Derive HMAC Key
const deriveHMACKey = async (password) => {
  const encoder = new TextEncoder();
  return await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
};

// Compute HMAC
const computeHMAC = async (key, data) => {
  return new Uint8Array(await window.crypto.subtle.sign('HMAC', key, data));
};

// Encrypt Function
const encrypt = async (plaintext) => {
  const encoder = new TextEncoder();
  const iv = generateRandomBytes(IV_LENGTH);
  const salt = generateRandomBytes(SALT_LENGTH);
  const aesKey = await deriveKey(PASSWORD, salt);
  const hmacKey = await deriveHMACKey(PASSWORD);

  const ciphertext = new Uint8Array(
    await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      aesKey,
      encoder.encode(plaintext)
    )
  );

  // Combine IV + Salt + Ciphertext
  const payload = new Uint8Array(iv.length + salt.length + ciphertext.length);
  payload.set(iv);
  payload.set(salt, iv.length);
  payload.set(ciphertext, iv.length + salt.length);

  // Compute HMAC
  const hmac = await computeHMAC(hmacKey, payload);

  // Combine Payload + HMAC
  const finalPayload = new Uint8Array(payload.length + hmac.length);
  finalPayload.set(payload);
  finalPayload.set(hmac, payload.length);

  return btoa(String.fromCharCode(...finalPayload));
};

// Decrypt Function
const decrypt = async (encryptedText) => {
  const decodedData = Uint8Array.from(atob(encryptedText), (char) => char.charCodeAt(0));

  const iv = decodedData.slice(0, IV_LENGTH);
  const salt = decodedData.slice(IV_LENGTH, IV_LENGTH + SALT_LENGTH);
  const ciphertextLength = decodedData.length - IV_LENGTH - SALT_LENGTH - 32; // Exclude HMAC (32 bytes)
  const ciphertext = decodedData.slice(IV_LENGTH + SALT_LENGTH, IV_LENGTH + SALT_LENGTH + ciphertextLength);
  const receivedHMAC = decodedData.slice(decodedData.length - 32);

  const aesKey = await deriveKey(PASSWORD, salt);
  const hmacKey = await deriveHMACKey(PASSWORD);

  // Verify HMAC
  const payload = decodedData.slice(0, decodedData.length - 32);
  const computedHMAC = await computeHMAC(hmacKey, payload);

  if (!computedHMAC.every((byte, index) => byte === receivedHMAC[index])) {
    throw new Error('HMAC verification failed!');
  }

  const plaintext = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    aesKey,
    ciphertext
  );

  return new TextDecoder().decode(plaintext);
};

export { encrypt, decrypt };
