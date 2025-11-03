export type OpaqueType<T, Type extends string> = T & { __type: Type };

export type GetOpaqueType<T> = T extends string & {
  __type: infer N extends string;
}
  ? N
  : never;

export type RecordToParams<T extends Record<any, any>> = {
  [K in keyof T as GetOpaqueType<keyof T & string>]: keyof T;
} & {
  [K in keyof T as GetOpaqueType<T[keyof T]>]: T[keyof T];
};
