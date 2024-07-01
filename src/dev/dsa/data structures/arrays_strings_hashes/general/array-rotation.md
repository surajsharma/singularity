```python

#!/usr/bin/env python3
	
def rotate_array(a,k):
	 #INDEX OF ITERATED ITEM ROTATED = (i+k)%SIZE
	result=[0]*len(a)
	
	for inx,val in enumerate(a):
		index = (inx+k)%len(a)
		result[index]=val
		
	return result	
		
arr=[7,2,8,3,5]
rotated = rotate_array(arr, 1)
print('',arr,'\n=>\n',rotated)

```