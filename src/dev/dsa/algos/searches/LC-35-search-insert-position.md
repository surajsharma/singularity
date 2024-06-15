- https://leetcode.com/problems/search-insert-position/description/
- O(n) worst case

```python
#!/usr/bin/env python3

def searchInsert(nums:[int], target: int) -> int:
	if target in nums:
		return nums.index(target)
	else:
		for (index,n) in enumerate(nums):
			if n > target:
				return index
	
	return len(nums)


print(searchInsert([1,3,5,6],7))
```