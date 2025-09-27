## 125. [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii/)

### O(n)


```js
var isPalindrome = function (s) {
    const clean = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const reverse = clean.split("").reverse().join("");
    return clean == reverse;
};
```


```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        r = s.lower()
        r = ''.join(ch for ch in r if ch.isalnum())
        return r == r[::-1]

```