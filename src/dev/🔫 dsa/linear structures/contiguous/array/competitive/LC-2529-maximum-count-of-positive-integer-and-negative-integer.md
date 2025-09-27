## 2529. [Maximum count of positive integer and negative integer](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer)

### O(n)

```python

class Solution:
    def maximumCount(self, nums: List[int]) -> int:
        pos=0
        neg=0
        for i in nums:
            if i < 0:
                neg+=1
            if i > 0:
                pos+=1

        return max(pos,neg)

```