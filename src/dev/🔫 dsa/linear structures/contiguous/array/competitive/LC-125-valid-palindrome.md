## 125. [✅ Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)

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

```rust 
impl Solution {
    pub fn is_palindrome(s: String) -> bool {
        let filtered: String = s.chars()
            .filter(|c| c.is_alphanumeric())
            .map(|c| c.to_ascii_lowercase())
            .collect();

        filtered.chars().eq(filtered.chars().rev())        
    }
}
```
