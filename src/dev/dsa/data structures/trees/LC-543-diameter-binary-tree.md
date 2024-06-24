- [543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree)
- O(n)


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
