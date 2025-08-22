const crypto = require('crypto');

class EncryptionService {
  constructor() {
    // In a real-world scenario, key management would be more sophisticated
    this.algorithm = 'aes-256-cbc';
  }

  // Generate a random encryption key for a patient
  generateEncryptionKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Encrypt data with a given key
  encrypt(data, key) {
    try {
      // Convert key from hex to buffer
      const keyBuffer = Buffer.from(key, 'hex');
      
      // Generate a random initialization vector
      const iv = crypto.randomBytes(16);
      
      // Create cipher
      const cipher = crypto.createCipheriv(this.algorithm, keyBuffer, iv);
      
      // Encrypt the data
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Return the IV and encrypted data
      return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
      };
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  // Decrypt data with a given key
  decrypt(encryptedData, iv, key) {
    try {
      // Convert key and IV from hex to buffer
      const keyBuffer = Buffer.from(key, 'hex');
      const ivBuffer = Buffer.from(iv, 'hex');
      
      // Create decipher
      const decipher = crypto.createDecipheriv(this.algorithm, keyBuffer, ivBuffer);
      
      // Decrypt the data
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }

  // Generate a hash of the data for blockchain storage
  generateDataHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Encode consent permissions for blockchain storage
  encodeConsentPermissions(consentSettings) {
    // This is a simplified version - in a real implementation, this would be more complex
    const consentBuffer = Buffer.from(JSON.stringify(consentSettings));
    return consentBuffer.toString('base64');
  }

  // Decode consent permissions from blockchain
  decodeConsentPermissions(encodedPermissions) {
    try {
      const consentBuffer = Buffer.from(encodedPermissions, 'base64');
      return JSON.parse(consentBuffer.toString());
    } catch (error) {
      console.error('Error decoding consent permissions:', error);
      throw error;
    }
  }
}

module.exports = new EncryptionService();