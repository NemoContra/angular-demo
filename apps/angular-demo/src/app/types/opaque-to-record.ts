export type BrandTypeName<T> = T extends string & {
  __type: infer N extends string;
}
  ? N
  : never;

export type RecordToParams<T extends Record<any, any>> = {
  [K in keyof T as BrandTypeName<keyof T>]: keyof T;
} & {
  [K in keyof T as BrandTypeName<T[keyof T]>]: T[keyof T];
};
