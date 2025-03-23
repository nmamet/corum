import { getConnection } from "./connection.ts";

import type { User, UserInfo } from "@/core/users/user.model";

async function getAllUsersInfo(): Promise<UserInfo[]> {
  return await getConnection()
    .connection.select("firstName", "lastName", "email", "birthDate")
    .from("user");
}

async function createUser(newUser: User): Promise<void> {
  console.log(newUser);
  const result = await getConnection().connection("user").insert(newUser);
  console.log(result);
}

async function getUser(email: string): Promise<User | undefined> {
  const matchingUsers = await getConnection()
    .connection.select(
      "firstName",
      "lastName",
      "email",
      "birthDate",
      "password",
    )
    .from("user")
    .where({ email });
  if (matchingUsers.length === 1) {
    return matchingUsers[0] as User;
  }
  if (matchingUsers.length === 0) {
    return undefined;
  }
  throw new Error("Got more than one user when fetching user with email");
}

export default {
  getAllUsersInfo,
  getUser,
  createUser,
} as const;
