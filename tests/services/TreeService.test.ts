import { TreeService } from '../../src/services/tree.service';
import { commandsSet } from './data/commandList.data';
import { TreeNode } from '../../src/data-structures/TreeNode';
import { Tree } from '../../src/data-structures/Tree';
import { logger } from '../../src/utils/Logger';

describe('The Service Tree instance', () => {
  let treeService: TreeService;
  let spyListTree;
  let spyMoveTree;
  let spyDeleteTree;
  let spyCreateTree;

  beforeEach(() => {
    const rootDir = new TreeNode('', [], null);
    const tree = new Tree(rootDir, logger);
    spyListTree = jest.spyOn(tree, 'list');
    spyMoveTree = jest.spyOn(tree, 'move');
    spyDeleteTree = jest.spyOn(tree, 'delete');
    spyCreateTree = jest.spyOn(tree, 'create');
    treeService = new TreeService(tree, commandsSet[0].commands);
  });

  test('should run commands', () => {
    treeService.runCommandsList();
    expect(spyCreateTree).toBeCalledTimes(3);
    expect(spyListTree).toBeCalledTimes(4);
    expect(spyDeleteTree).toBeCalledTimes(1);
  });

  test('should run commands new set', () => {
    treeService.setCommands(commandsSet[1].commands);
    treeService.runCommandsList();
    expect(spyCreateTree).toBeCalledTimes(4);
    expect(spyListTree).toBeCalledTimes(5);
    expect(spyMoveTree).toBeCalledTimes(1);
    expect(spyDeleteTree).toBeCalledTimes(2);
  });
});
