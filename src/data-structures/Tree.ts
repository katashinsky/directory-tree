import { ITree } from '../interfaces/ITree';
import { TreeNode } from './TreeNode';
import { ErrorHandler } from '../decorators/error-handler';
import { CommandsEnum, ErrorsEnum } from '../enums';
import { logger, Logger } from '../utils/Logger';

export class Tree implements ITree {
  private searchError: string = 'Not found';
  constructor(private root: TreeNode, private logger: Logger) {
  }

  @ErrorHandler(ErrorsEnum.TREE_CREATE_ERROR)
  public create(dir: string, parentDir?: string): void {
    const parentNode = this.search(parentDir);
    if (parentNode === this.searchError) {
      throw new Error(`${ErrorsEnum.TREE_PARENT_DIR} (${parentDir})`);
    }
    const newNode = new TreeNode(dir, [], parentNode as TreeNode);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    this.addChildNode(newNode, parentDir);
  }

  @ErrorHandler(ErrorsEnum.TREE_DELETE_ERROR)
  public delete(dirChain: string[], isMove: boolean = false): void {
    if (!isMove) { this.checkParentsChain(dirChain, CommandsEnum.DELETE); }
    this.goOver((node) => {
      node.getChildren().forEach((childNode, index) => {
        if (childNode.getValue() === dirChain.last()) {
          node.removeChild(index);
        }
      });
    });
  }

  @ErrorHandler(ErrorsEnum.TREE_LIST_ERROR)
  public list(node?: TreeNode, deep: number = 0): any {
    const parentNode = node || this.root;
    this.logger.showTree(parentNode, deep);

    if (parentNode.getChildren() && !parentNode.getChildren().length) {
      return parentNode;
    }

    parentNode.getChildren().forEach((child) => {
      this.list(child, deep + 1);
    });
  }

  @ErrorHandler(ErrorsEnum.TREE_MOVE_ERROR)
  public move(dirChain: string[], dirTo: string): void {
    this.checkParentsChain(dirChain, CommandsEnum.MOVE);

    const nodeToMove = this.search(dirChain.last()) as TreeNode;
    const parentNode = this.search(dirTo);
    nodeToMove.setParent(parentNode as TreeNode);

    this.delete(dirChain, true);
    this.addChildNode(nodeToMove, dirTo);
  }

  public getRoot() {
    return this.root;
  }

  private goOver(cd: (node: TreeNode) => void) {
    const forEachNode = (node) => {
      cd(node);
      node.children.forEach((child) => {
        forEachNode(child);
      });
    };

    forEachNode(this.root);
  }

  private search(dir: string): TreeNode | string {
    let returnNode: TreeNode;

    this.goOver((node) => {
      if (node.getValue() === dir) {
        returnNode = node;
      }
    });

    return returnNode || this.searchError;
  }

  private addChildNode(newNode: TreeNode, parentDir) {
    this.goOver((node: TreeNode) => {
      if (node.getValue() === parentDir) {
        node.setChildren(newNode);
      }
    });
  }

  private checkParentsChain(dirChain: string[], type: string) {
    dirChain.forEach((dir, index) => {
      const foundedDir = this.search(dir);
      const parentNode = (foundedDir as TreeNode).getParent();
      const parentDirValue = parentNode && parentNode.getValue();

      if (foundedDir === this.searchError ||
        (
          index > 0 && parentDirValue !== dirChain[index - 1]
        ) || (
          index === 0 &&
          !this.root.getChildren().map(child => child.getValue()).includes(dirChain[0])
        )
      ) {
        throw new Error(`Cannot ${type} ${dirChain.join('/')} - ${dir} does not exist`);
      }
    });
  }
}

export const tree = new Tree(new TreeNode('', [], null), logger);
