### 747. [Largest Number at least twice of others](https://leetcode.com/problems/largest-number-at-least-twice-of-others)
 
## O(n)

```python
class Solution(object):
    def dominantIndex(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        length =  len(nums)-1
        newnums =[]

        if(len(nums)==1):
            return 0

        for num in nums:
            newnums.append(num)

        newnums.sort()

        last = newnums[length]
        slast = newnums[length-1]

        if last >= slast*2:
            return nums.index(last)
        else:
            return -1
```