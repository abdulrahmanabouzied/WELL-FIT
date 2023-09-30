import * as bcrypt from "bcrypt";
const salt = await bcrypt.genSalt(10);

/**
 * Hash a string
 * @param {string} password
 * @returns {string}
 */
const genHash = async (password) => {
  return await bcrypt.hash(password, salt);
};

export default genHash;
