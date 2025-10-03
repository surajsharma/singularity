## 242. [✅ Valid Anagram](https://leetcode.com/problems/valid-anagram/)

### O(n log n + m log m) using `sorted`

```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s1 = s.replace(' ','').lower()
        t1 = t.replace(' ','').lower()
        return sorted(s1) == sorted(t1)
```

### O(n+m) using `Counter`

```python
from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s1 = s.replace(' ','').lower()
        t1 = t.replace(' ','').lower()
        return Counter(s1) == Counter(t1)
```

### O(n) with two parallel for loops

```javascript
var isAnagram = function (s, t) {
  if (t.length !== s.length) return false;
  const counts = Object.create(null);
  for (const char of s) counts[char] = (counts[char] || 0) + 1;
  for (const char of t) {
    if (!counts[char]) return false;
    counts[char]--;
  }
  return true;
};
```
