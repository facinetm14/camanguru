import crypto from "crypto";

const NB_ITERATION = 1000;
const SIXTY_FOUR_BITS = 64;
const SHA_512 = "sha512";
const HEX_DECIMAL = "hex";

const generateRandomSalt = (): string => {
  return crypto.randomBytes(16).toString(HEX_DECIMAL);
};

export const hashPassword = (
  passwd: string
): { salt: string; hash: string } => {
  const salt = generateRandomSalt();
  const hash = crypto
    .pbkdf2Sync(passwd, salt, 1000, 64, SHA_512)
    .toString(HEX_DECIMAL);
  return { salt, hash };
};

export const verifyPassword = async (
  passwd: string,
  hashPasswd: string,
  salt: string
) => {
  const hash = crypto
    .pbkdf2Sync(passwd, salt, NB_ITERATION, SIXTY_FOUR_BITS, SHA_512)
    .toString(HEX_DECIMAL);

  return hashPasswd === hash;
};

export const isPasswordStrong = (passwd: string): boolean => {
  const rulePattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9_]).+$/;
  if (passwd.length < 12) {
    return false;
  }
  const passwdRegex = new RegExp(rulePattern);

  return passwd.match(passwdRegex) ? true : false;
};
