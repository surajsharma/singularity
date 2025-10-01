## 242. [✅ Valid Anagram](https://leetcode.com/problems/valid-anagram/)


```javascript
var isAnagram = function (s, t) {
	if (t.length !== s.length) return false;
	const counts = {};

	for (let c of s) {
		counts[c] = (counts[c] || 0) + 1;
	}

	for (let c of t) {
		if (!counts[c]) return false;
		counts[c]--;

	}
	return true;
};
```


```python
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s1 = s.replace(' ','').lower()
        t1 = t.replace(' ','').lower()
        return sorted(s1) == sorted(t1)
```


### O(n)

```python
from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        s1 = s.replace(' ','').lower()
        t1 = t.replace(' ','').lower()
        return Counter(s1) == Counter(t1)
```
