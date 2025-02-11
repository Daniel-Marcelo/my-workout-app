export type InputOption = {
  name: string;
  code: string;
};

export type WithId<T> = T & { id: string };
