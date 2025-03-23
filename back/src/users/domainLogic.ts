import { z } from "zod";

import { hashPassword } from "./password.ts";
import userPersistence from "./persistence.ts";
import { DuplicateResourceError } from "../errors.ts";

import type { User, UserInfo } from "@/core/users/user.model";

const userSchema: z.ZodSchema<User> = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  birthDate: z.number().int(),
  password: z
    .string()
    //8 characters minimum, at least one capitalized letter, at least one lower case letter, atleast one special character
    .regex(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/),
});

/**
 * validate the user, check for an already existing user, persist the user in the database
 * idempotent (will not throw if the same user already exists)
 * @param newUser unknown data that will be validated ; should be a user
 * @throws DuplicateResourceError if a user with the same email already exists
 */
export async function createUser(newUser: unknown): Promise<UserInfo> {
  const validUser = userSchema.parse(newUser);
  const existingUser = await userPersistence.getUser(validUser.email);
  if (existingUser !== undefined) {
    throw new DuplicateResourceError("A user with this email already exists");
  }
  const hashedPasswordUser = {
    ...validUser,
    password: await hashPassword(validUser.password),
  };
  await userPersistence.createUser(hashedPasswordUser);
  return getInfo(validUser);
}

/**
 * removes password from the user
 */
function getInfo(user: User): UserInfo {
  const { password: _password, ...userInfo } = user;
  return userInfo;
}
