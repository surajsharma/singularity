- https://leetcode.com/problems/group-anagrams



```javascript
let strs = ["eat","tea","tan","ate","nat","bat"]

var groupAnagrams = function(strs) {
    let hashmap = {}
    for (let s of strs){
        let i = Object.keys(hashmap).indexOf(s.split('').sort());
        let key = s.split('').sort();
        hashmap[key]?hashmap[key].push(s):hashmap[key]=[s];
    }
    return Object.values(hashmap);
};

console.log(groupAnagrams(strs));
```


```python

from collections import defaultdict

def groupAnagrams(strs):
	hashmap = defaultdict(list)	
	for s in strs:
		# keys can be strings, bcz they are immutable.
		hashmap[str(sorted(s))].append(s) 
	return hashmap.values()

print(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))

```
