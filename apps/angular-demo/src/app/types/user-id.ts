export type UserId = string & { __type: 'userId' };
export const UserId = (userId: string) => userId as UserId;
