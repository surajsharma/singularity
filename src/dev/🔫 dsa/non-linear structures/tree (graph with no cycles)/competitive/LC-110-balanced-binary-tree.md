## 110. [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/description/)

### O(n)

```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def h(root):
            if not root:
                return 0
            
            lt = h(root.left)
            rt = h(root.right)
            
            # If subtree is unbalanced, propagate -1
            if lt == -1 or rt == -1 or abs(lt - rt) > 1:
                return -1
            
            return 1 + max(lt, rt)
        
        return h(root) != -1

```

```python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        isbal = True

        def h(root):
            nonlocal isbal 
            if not root:
                return 0

            lt = h(root.left)
            rt = h(root.right)
            
            if abs(lt-rt) > 1 :
                isbal = False

            return 1 + max(lt,rt)
        
        h(root)
        return isbal
```


```js
var isBalanced = function(tree) {
	let isBalanced = tru	function dfs(t){
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
