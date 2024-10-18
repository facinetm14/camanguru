import bcrypt from "bcrypt";

export const hashPassword = async (paswd: string) => {
    const saltRound = 10;
    return bcrypt.hash(paswd, saltRound);
}

export const compareHash = async (passwd: string, hashPasswd: string) => {
    return bcrypt.compare(passwd, hashPasswd);
}