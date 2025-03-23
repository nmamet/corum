import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function hashPassword(plainTextPassword: string): Promise<string> {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

export function checkPassword(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash);
}
