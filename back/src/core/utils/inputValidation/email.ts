export const isValidEmail = (email: string): boolean => {
    const patterns = /^[^\s@]+@[^\s@]+\./;
    const emailRegex = new RegExp(patterns);
    return email.match(emailRegex) ? true : false;
}