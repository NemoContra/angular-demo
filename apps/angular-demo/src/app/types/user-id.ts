import { OpaqueType } from './opaque-to-record';

export type UserId = OpaqueType<string, 'userId'>;
export const UserId = (userId: string) => userId as UserId;
