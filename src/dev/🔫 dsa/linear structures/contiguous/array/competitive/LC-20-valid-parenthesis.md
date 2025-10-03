## 20. [✅ Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)

### O(n) using proper stack

```python
class Solution:
	def isValid(s: str) -> bool:
		stack = []
		mapping = {'(': ')', '[': ']', '{': '}'}

		for ch in s:
			if ch in mapping:               # opening bracket
				stack.append(mapping[ch])   # push the expected closer
			else:                           # closing bracket
				if not stack or stack.pop() != ch:
					return False

		return not stack

print(isValid('{{}}'))
```

### O(n*n) using string concatanation

```python
#!/usr/bin/env python3

def isValid(s) -> bool:
	bopen = '({['
	bclose = ')}]'
	
	lastopen = ''
	nextclose = ''
	
	if not len(s) or len(s)%2 != 0:
		return False
	
	for b in s:
		if b in bopen:
			lastopen += b
			nextclose = bclose[bopen.index(lastopen[-1:len(lastopen)])]			
			
		if b in bclose:
			if nextclose == '' or not len(lastopen):
				return False
			
			
			else:
				if b == nextclose:
					lastopen = lastopen[:len(lastopen)-1]
					nextclose = bclose[bopen.index(lastopen[-1:len(lastopen)])]			
				else:
					return False
	
	if len(lastopen):
		return False
	
	return True
	
print(isValid("(())"))
```
