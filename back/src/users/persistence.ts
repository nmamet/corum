import { getConnection } from "./connection.ts";

import type { UserInfo } from "@/core/users/user.model";

async function getAllUsersInfo(): Promise<UserInfo[]> {
  return await getConnection()
    .connection.select("firstName", "lastName", "email", "birthDate")
    .from("user");
}

export default {
  getAllUsersInfo,
} as const;
