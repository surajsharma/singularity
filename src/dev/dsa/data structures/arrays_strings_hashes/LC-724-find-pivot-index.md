- https://leetcode.com/problems/find-pivot-index
- O(n)

```python
class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        # total_sum - left_sum - P[i] == left_sum
        total_sum = sum(nums)
        
        for i in range(len(nums)):
            left_sum = (sum(nums[:i]))
            if total_sum-left_sum-nums[i] == left_sum:
                return i
            
        return -1
```