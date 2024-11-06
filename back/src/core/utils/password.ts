import bcrypt from "bcrypt";

export const hashPassword = async (paswd: string) => {
  const saltRound = 10;
  return bcrypt.hash(paswd, saltRound);
};

export const compareHash = async (passwd: string, hashPasswd: string) => {
  return bcrypt.compare(passwd, hashPasswd);
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
