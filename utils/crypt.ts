/**
 * Contains all functions regarding password encryption
 */
import bcrypt from 'bcryptjs';

/**
 * Hash a password
 * @param password 
 */
export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

/**
 * 
 * @param passwordGiven unhashed plain password
 * @param passwordActual hashed password
 */
export const comparePassword = async (passwordGiven: string, passwordActual: string) => {
    return await bcrypt.compare(passwordGiven, passwordActual);
}
