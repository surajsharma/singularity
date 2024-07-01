# [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- O(n)
- Inorder = left-root-right

```js

var inorderTraversal = function(root) {
    let tree = [];

    function dfs(node){
        if(!node) return;
        if(node.val === null) return;
        let left = dfs(node.left);
        if(node.val != null){
            tree.push(node.val);
        }
        let right = dfs(node.right);
    }

    dfs(root);
    return tree;
};


```