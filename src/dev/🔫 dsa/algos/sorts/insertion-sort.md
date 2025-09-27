```python

#!/usr/bin/env python3

def insertion_sort(arr):
	for i in range(1, len(arr)):
		val = arr[i]
		while i > 0 and arr[i-1] > val:
			arr[i] = arr[i-1]
			i = i -1
		arr[i] = val
		
	return arr


tosort = [3,1,2,4]	
print('final:',insertion_sort(tosort))

```