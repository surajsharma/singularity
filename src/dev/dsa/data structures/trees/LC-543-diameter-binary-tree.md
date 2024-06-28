# 543. [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree)
## O(n)


```python

def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
    def get_depth(node):
        nonlocal dia                    # nonlocal for outer scoped var
        if not node:                    # base case
            return 0

        left = get_depth(node.left)
        right = get_depth(node.right)

        dia = max(dia, left+right)      #diameter is updated if < l+r
        return 1 + max(left, right)     #return greater depth for each level

    dia = 0
    get_depth(root)
    return dia

```

```js
var diameterOfBinaryTree = function (root) {
    let d = 0;
    dfs(root);
    return d;

    function dfs(root) {
        if (!root) return 0;

        const left = dfs(root.left);
        const right = dfs(root.right);

        d = Math.max(d, left+right);
        let gd = 1 + Math.max(left, right);
        return gd;
    }
};
```
