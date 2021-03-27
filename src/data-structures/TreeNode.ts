export class TreeNode {
  constructor(private value: string, private children: TreeNode[], private parent: TreeNode) {
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }

  public getChildren(): TreeNode[] {
    return this.children;
  }

  public setChildren(treeNode: TreeNode): void {
    this.children.push(treeNode);
  }

  public removeChild(index: number): void {
    this.children.splice(index, 1);
  }

  public setParent(treeNode: TreeNode): void {
    this.parent = treeNode;
  }

  public getParent(): TreeNode {
    return this.parent;
  }
}
