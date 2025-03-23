import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(plainTextPassword: string): Promise<string> {
  return await bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

export function checkPassword(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  console.log(plainTextPassword, hash);
  return bcrypt.compare(plainTextPassword, hash);
}
