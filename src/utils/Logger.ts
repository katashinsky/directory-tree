import { TreeNode } from '../data-structures/TreeNode';

export class Logger {
  constructor() {
  }

  public log(value: string) {
    // tslint:disable-next-line:no-console
    console.log(value);
  }

  public error(value: string): void {
    // tslint:disable-next-line:no-console
    console.error(`Error: ${value}`);
  }

  public showTree(parentNode: TreeNode, deep: number): void {
    // tslint:disable-next-line:no-console
    console.log(`${this.setPreString(' ', deep + 1)}${parentNode.getValue()}`);
  }

  private setPreString(symbol: string = ' ', count: number): string {
    let str: string  = '';
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < count; i++) { str += symbol; }

    return str;
  }
}

export const logger = new Logger();
