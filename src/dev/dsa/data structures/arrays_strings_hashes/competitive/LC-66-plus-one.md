- https://leetcode.com/problems/plus-one/description/

```python

class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        nums = ''.join([str(x) for x in digits])
        return [int(x) for x in str(int(nums)+1)]
```