import { getConnection } from "./connection.ts";
import { hashPassword } from "./password.ts";

import type { User, UserInfo } from "@/core/users/user.model";

async function getAllUsersInfo(): Promise<UserInfo[]> {
  return await getConnection()
    .connection.select("firstName", "lastName", "email", "birthDate")
    .from("user");
}

async function createUser(newUser: User): Promise<void> {
  const hash = hashPassword(newUser.password);
  const result = await getConnection()
    .connection("user")
    .insert({ ...newUser, password: hash });
  console.log(result);
}

export default {
  getAllUsersInfo,
  createUser,
} as const;
