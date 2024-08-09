export default function getSankeyLevel(links: Record<'source' | 'target' | 'value', string>[]) {
  const tree = createTreeWithValues(links)

  // 获取树的高度
  return getTreeHeight(tree)
}

// links 转成 树
function createTreeWithValues(links: Record<'source' | 'target', string>[]) {
  const tree = {};

  links.forEach(item => {
    const { source, target } = item;

    if (!tree[source]) {
      tree[source] = { name: source, children: [] };
    }

    if (!tree[target]) {
      tree[target] = { name: target, children: [] };
    }

    tree[source].children.push(tree[target]);
  });

  // 查找根节点
  const rootNodes = Object.keys(tree).filter(node => !links.some(item => item.target === node));

  // 如果有多个根节点，可以创建一个虚拟根节点
  if (rootNodes.length > 1) {
    const virtualRoot = { name: null, children: [] };
    rootNodes.forEach(node => virtualRoot.children.push(tree[node]));
    return virtualRoot;
  }

  return tree[rootNodes[0]];
}

function getTreeHeight(root: {name: string, children: any[]}) {
  if (!root) {
    return 0;
  }

  let height = 0;
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (node.children && node.children.length > 0) {
        queue.push(...node.children);
      }
    }

    height++;
  }

  // 存在虚拟根节点 -1
  if(root.name === null) {
    height--
  }

  return height;
}
