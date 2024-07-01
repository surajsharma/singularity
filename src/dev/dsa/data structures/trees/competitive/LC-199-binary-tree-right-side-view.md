# 199. [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)

## O(n)

```js


var rightSideView = function (root) {
    let rv = []
    dfs(root,0)
    return rv

    function dfs(n,l) {
        if (!n) return
        rv[l] = n.val
        dfs(n.left,l+1)
        dfs(n.right,l+1)
    }
};


```