#!/usr/bin/env python3
arr = [9,8,7,6,5,4,3,2,1]

def bs(arr, search):
	
	right = len(arr)-1
	left = 0
	
	while right >= left:
		midpoint = (left + right) // 2
		if search == arr[midpoint]:
			return midpoint
		elif search < arr[midpoint]:
			left = midpoint + 1
		else:
			right = midpoint - 1
			
print(bs(arr,9))
print(bs(arr,8))
print(bs(arr,5))
print(bs(arr,2))