- [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/description/)
- O(n)


```js

var isBalanced = function(tree) {
	let isBalanced = true
	function dfs(t){
		if(!t) return 0
		const left = dfs(t.left)
		const right = dfs(t.right)
		if(Math.abs(left-right) > 1){
			isBalanced = false
		}
		return 1 + Math.max(left, right)
	}
	dfs(tree)
  return isBalanced;    
};


```
