## 509. [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

### O(n)

```py 
class Solution:
    def climbStairs(self, n: int) -> int:
        memo = {1:1, 2:2}

        def f(n):
            if n in memo:
                return memo[n]
            else:
                memo[n] = f(n-2)+f(n-1)
                return memo[n]
        
        return f(n)
```
