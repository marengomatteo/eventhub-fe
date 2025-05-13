export const getPasswordRequirements = (password: string) => ({
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSymbol: /[@#$%^&+=]/.test(password),
    hasMinLength: password.length >= 8,
});