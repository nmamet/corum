import { z } from "zod";

import { hashPassword } from "./password.ts";
import userPersistence from "./persistence.ts";

import type { User, UserInfo } from "@/core/users/user.model";

const userSchema: z.ZodSchema<User> = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  birthDate: z.number().int(),
  password: z
    .string()
    .regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/),
});

export async function createUser(newUser: unknown): Promise<UserInfo> {
  const validatedUser = userSchema.parse(newUser);
  const hashedPasswordUser = {
    ...validatedUser,
    password: await hashPassword(validatedUser.password),
  };
  await userPersistence.createUser(hashedPasswordUser);
  const { password: _password, ...newUserInfo } = validatedUser;
  return newUserInfo;
}
