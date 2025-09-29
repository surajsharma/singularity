## 226. [✅ Invert binary tree](https://leetcode.com/problems/invert-binary-tree)

### O(n)

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        def invert(root):
            if not root:
                return
            root.left, root.right = root.right, root.left

            invert(root.left)
            invert(root.right)
        invert(root)
        return root
```
