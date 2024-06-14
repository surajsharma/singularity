- https://leetcode.com/problems/two-sum/
- O(n)

```javascript
var twoSum = function (nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const complement = target - current;
        if (complement in map) {
            return [i, map[complement]];
        } else {
            map[current] = i;
        }
    }
};
```


```python

class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        for i in range(len(nums)):
            for j in range(len(nums)):
                if nums[i] + nums[j] == target and i !=j:
                    return [i, j]
```
