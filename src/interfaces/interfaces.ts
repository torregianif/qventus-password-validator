export interface PasswordOptions {
    requireSpecialChars: boolean;
    requireDigit: boolean;
    requireUppercase: boolean;
    noConsecutiveLetters: boolean;
    [key: string]: boolean;
}