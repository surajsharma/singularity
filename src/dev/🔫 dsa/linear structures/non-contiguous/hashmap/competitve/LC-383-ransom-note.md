## 21. [✅ Ransom Note](https://leetcode.com/problems/ransom-note/)

### O(m+n)

```python
class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        ht = {}
        th = {}

        for char in ransomNote:
            ht[char] = ht.get(char, 0) + 1
        
        for char in magazine:
            th[char] = th.get(char, 0) + 1

        for k, v in ht.items():
            if th.get(k, 0) < v:
                return False
        return True
```


- concise with Counter

```python
from collections import Counter

class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        return not (Counter(ransomNote) - Counter(magazine))
```
