## 1509. [Minimum Difference Between Largest and Smallest Value in Three Moves](https://leetcode.com/problems/minimum-difference-between-largest-and-smallest-value-in-three-moves)


### JS - O(n log n)

```js 

var minDifference = function (nums) {
    if (nums.length <= 4) {
        return 0;
    }
    nums.sort((a, b) => a - b);
    let ans = nums[nums.length - 1] - nums[0];
    for (let i = 0; i <= 3; i++) {
        ans = Math.min(ans, nums[nums.length - (3 - i) - 1] - nums[i]);
    }
    return ans;
};

```


### python with [[heap]]  - O(n)


```python 

class Solution:
    def minDifference(self, nums: List[int]) -> int:
        if len(nums) <= 4:
            return 0

        min_4 = sorted(heapq.nsmallest(4,nums))
        max_4 = sorted(heapq.nlargest(4,nums))

        res = float("inf")

        for i in range(4):
            res = min(
                res,
                max_4[i]-min_4[i]
            )
        return res
        

```

[//begin]: # "Autogenerated link references for markdown compatibility"
[heap]: ../../../patterns/heap "heap"
[//end]: # "Autogenerated link references"