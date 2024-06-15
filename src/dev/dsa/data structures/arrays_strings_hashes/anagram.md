```python
#!/usr/bin/env python3
# Find if two given strings are anagrams of each other
# Complexity: o(n)

import time

def isAnagram(s,t):
	start = time.time()
	stable = []
	ttable = []
	for char in s:
		stable.append(ord(char))
	for char in t:
		ttable.append(ord(char))
	stable.sort();
	ttable.sort();	
	end = time.time()
	return stable == ttable and len(s) == len(t), end-start
```

```python
def anagram(s,t):
	start = time.time()
	if len(s) != len(t):
		return False,  time.time()-start
	for x in s:
		if x not in t:
			return False,  time.time()-start
	return True, time.time()-start
	
#result = anagram("suraj", "jarus")
#print(result)
#result = anagram("abcd", "cba")
#print(result)
result = anagram("acacbac", "bbbbbac")
print(result)```