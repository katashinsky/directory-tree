import { TreeNode } from '../../src/data-structures/TreeNode';

describe('The TreeNode instance', () => {
  let rootNode: TreeNode;

  beforeEach(() => {
    rootNode = new TreeNode('root', [], null);
  });

  test('children', () => {
    expect(rootNode.getChildren()).toMatchObject([]);
    const newNode = new TreeNode('dir1', [], null);
    rootNode.setChildren(newNode);
    expect(rootNode.getChildren()).toContainEqual(newNode);
    expect(rootNode.getChildren().length).toBe(1);
  });

  test('removeChildren', () => {
    const dir1Node = new TreeNode('dir1', [], null);
    const dir2Node = new TreeNode('dir2', [], null);
    rootNode.setChildren(dir1Node);
    rootNode.setChildren(dir2Node);
    expect(rootNode.getChildren().length).toBe(2);
    rootNode.removeChild(0);
    expect(rootNode.getChildren().length).toBe(1);
    expect(rootNode.getChildren()).toContainEqual(dir2Node);
  });

  test('parent', () => {
    const dir1Node = new TreeNode('dir1', [], null);
    dir1Node.setParent(rootNode);
    expect(dir1Node.getParent()).toMatchObject(rootNode);
  });

  test('value', () => {
    rootNode.setValue('rootNode');
    expect(rootNode.getValue()).toBe('rootNode');
  });
});
