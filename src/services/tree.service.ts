import { tree } from '../data-structures/Tree';
import { commands } from '../data/commands.json';
import { CommandsEnum } from '../enums';
import { ITree } from '../interfaces/ITree';

export class TreeService {
  constructor(private tree: ITree, private commands: string[]) {
  }

  public runCommandsList() {
    this.commands.forEach((commandItem) =>  {
      const { command, dirNames } = this.parseCommand(commandItem);

      switch (command) {
        case CommandsEnum.CREATE: {
          const dirList = ['', ...dirNames];
          const dir = dirList.length > 1 ? dirList.last() : null;
          const parentDir = dirList[dirList.length - 2];
          this.tree.create(dir, parentDir);
        } break;
        case CommandsEnum.DELETE: {
          this.tree.delete(dirNames, false);
        } break;
        case CommandsEnum.MOVE: {
          const [fromChain, to] = dirNames;
          this.tree.move(fromChain.split('/'), to);
        } break;
        case CommandsEnum.LIST: {
          this.tree.list();
        } break;
        default: {
          this.tree.list();
        }
      }
    });
  }

  public setCommands(commands: string[]): void {
    this.commands = commands;
  }

  public getCommands(): string[] {
    return this.commands;
  }
  private parseCommand(commandData: string): { command: string, dirNames: string[] }  {
    const [command, dirs, moveDir] = commandData.split(' ');
    let dirNames = dirs?.split('/');

    if (command === CommandsEnum.MOVE) {
      dirNames = [dirs, moveDir];
    }

    return { command, dirNames };
  }
}

export const treeService = new TreeService(tree, commands);
