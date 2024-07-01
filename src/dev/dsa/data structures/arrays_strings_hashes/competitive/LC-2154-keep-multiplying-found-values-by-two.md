- https://leetcode.com/problems/keep-multiplying-found-values-by-two
- O(n)

```python
class Solution(object):
    def findFinalValue(self, nums, original):
        """
        :type nums: List[int]
        :type original: int
        :rtype: int
        """
        F  = set(nums)
        
        while original in F:
            original *= 2
        return original
```