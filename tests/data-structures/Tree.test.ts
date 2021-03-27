import { Tree } from '../../src/data-structures/Tree';
import {  TreeNode } from '../../src/data-structures/TreeNode';
import { logger } from '../../src/utils/Logger';

describe('The Tree instance', () => {
  let tree: Tree;
  let spyLogger;

  beforeEach(() => {
    const rootDir = new TreeNode('root', [], null);
    spyLogger = jest.spyOn(logger,  'showTree');
    tree = new Tree(rootDir, logger);
  });

  test('should show list', () => {
    tree.list();
    expect(spyLogger).toBeCalled();
    tree.create('dir1', 'root');
    tree.list();
    expect(spyLogger).toBeCalledTimes(3);
  });

  test('should create', () => {
    tree.create('dir1', 'root');
    tree.create('dir2', 'root');
    tree.create('dir3', 'dir1');
    expect(tree.getRoot().getChildren().length).toBe(2);
    expect(tree.getRoot().getChildren()[0].getChildren().length).toBe(1);
  });

  test('should delete', () => {
    tree.create('dir1', 'root');
    tree.create('dir2', 'root');
    tree.create('dir3', 'dir2');
    tree.create('dir4', 'dir2');
    expect(tree.getRoot().getChildren()[1].getChildren().length).toBe(2);
    tree.delete(['dir2', 'dir4']);
    expect(tree.getRoot().getChildren()[1].getChildren().length).toBe(1);
  });

  test('should move', () => {
    tree.create('dir1', 'root');
    tree.create('dir2', 'root');
    tree.create('dir3', 'dir2');
    tree.create('dir4', 'dir2');
    expect(tree.getRoot().getChildren()[1].getChildren().length).toBe(2);
    tree.move(['dir2', 'dir4'], 'dir1');
    tree.move(['dir2', 'dir3'], 'dir1');
    expect(tree.getRoot().getChildren()[0].getChildren().length).toBe(2);
  });
});
