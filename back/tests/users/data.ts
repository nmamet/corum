import type { UserInfo } from "@/core/users/user.model";

export const fakeAllUsersInfo = [
  {
    firstName: "Bob",
    lastName: "the Builder",
    birthDate: 0,
    email: "bobthebuilder@bob.com",
  },
  {
    firstName: "Bob2",
    lastName: "the Builder2",
    birthDate: 0,
    email: "bobthebuilder2@bob.com",
  },
  {
    firstName: "Bob3",
    lastName: "the Builder3",
    birthDate: 0,
    email: "bobthebuilder3@bob.com",
  },
] as const satisfies UserInfo[];

export const fakeAllUsers = fakeAllUsersInfo.map((userInfo) => ({
  ...userInfo,
  password: "hash",
}));
