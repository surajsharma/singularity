##  14. [Longest common prefix](https://leetcode.com/problems/longest-common-prefix)
### O(n)

```python
def longestCommonPrefix(strs):
    ans=''
    for i in list(zip(*strs)):
#       print("\n",list((zip(*strs))))
        if len(set(i))==1:
            ans=ans+i[0]
        else:
            break
    return ans
    
print(longestCommonPrefix(["flower","flow","flight"]))
```

- with os.path.commonprefix

```python
import os
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        return os.path.commonprefix(strs)
```