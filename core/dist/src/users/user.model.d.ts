export type UserInfo = {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: number;
};
export type User = UserInfo & {
    password: string;
};
