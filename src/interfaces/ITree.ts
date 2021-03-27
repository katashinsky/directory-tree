export interface ITree {
  create(dir: string, parentDir: string): void;
  move(dirChain: string[], dirTo: string): void;
  delete(dirChain: string[], isMove: boolean): void;
  list(): string;
}
