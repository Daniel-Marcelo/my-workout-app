export type InputOption<Name = string, Value = string> = {
  name: Name;
  code: Value;
};

export type WithId<T> = T & { id: string };
