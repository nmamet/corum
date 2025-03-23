import type { UserInfo } from "@/core/users/user.model";

function getAllUsersInfo(): Promise<UserInfo[]> {
  return Promise.resolve([
    {
      firstName: "Bob",
      lastName: "the Builder",
      birthDate: 0,
      email: "bobthebuilder@bob.com",
    },
  ]);
}

export default {
  getAllUsersInfo,
} as const;
