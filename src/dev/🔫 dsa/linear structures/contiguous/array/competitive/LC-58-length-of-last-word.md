## 58. [Length of Last Word](https://leetcode.com/problems/length-of-last-word)

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        split = s.split()
        if len(split):
            lastWord = split[len(split)-1]
            return len(lastWord)
        else: 
            return 0
```