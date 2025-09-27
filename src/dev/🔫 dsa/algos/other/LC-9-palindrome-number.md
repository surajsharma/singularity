## 9. [Palindrome Number](https://leetcode.com/problems/palindrome-number/)

### O(1)


```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        return str(x) == str(x)[::-1]
```