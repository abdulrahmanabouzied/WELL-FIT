import crypto from "crypto";
import { config } from "dotenv";
config();

const algorithm = "aes-256-cbc";

/**
 * creation of keys:
    const keySecret = crypto.randomBytes(32).toString("hex");
    const ivSecret = crypto.randomBytes(16).toString("hex");
 */

const key = Buffer.from(process.env.CRYPTO_KEY_SECRET, "hex"); // 32 bytes for aes-256-cbc
const iv = Buffer.from(process.env.CRYPTO_IV_SECRET, "hex"); // 16 bytes for aes-256-cbc

/**
 * Encrypt a given string
 * @param {string} data
 * @returns {string} encrypted data
 * @description Encrypt a given string with 'aes-256-cbc' algorithm
 * using crypto module
 */
function encrypt(data) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

/**
 * Decrypt a given string
 * @param {string} encryptedText
 * @returns {string} decrypted text
 */
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export { decrypt, encrypt };
