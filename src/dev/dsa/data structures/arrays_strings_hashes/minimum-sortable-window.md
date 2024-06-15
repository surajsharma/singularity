```python
#!/usr/bin/env python3

def  smallestSortableRange(arr):
	l = len(arr)
	left, right = None, None
	max_seen, min_seen = -float("inf"), float("inf")
	
#	creating infinite values, +ve and -ve
#	print(min_seen, max_seen)
		
	for i in range(l):
		max_seen = max(max_seen, arr[i])
		if(arr[i] < max_seen):
			right = i
			
	for i in range(l-1,-1,-1):
		min_seen = min(min_seen, arr[i])
		if(arr[i] > min_seen):
			left = i
			
	return left, right


arr = [3,7,5,6,9]
print(smallestSortableRange(arr))```