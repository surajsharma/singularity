```python
#!/usr/bin/env python3

import queue

def nodeDepths(root):
	# Initialize an empty queue
	Q = queue.Queue()
	
	# Add root node and its depth to Q
	Q.put((root, 0))
	
	# Intialize result
	result = 0
	
	while(Q.qsize() > 0):
		
		temp = Q.get()
		# temp is a tuple with (node value, node depth)
		
		node = temp[0]
		depth = temp[1]
		
		# Update result accordingly
		result += depth
		
		# BFS code
		if (node.left):
			Q.put((node.left, depth + 1))
			
		if (node.right):
			Q.put((node.right, depth + 1))
			
	return result

# This is the class of the input binary tree.
class BinaryTree:
	def __init__(self, value):
		self.value = value
		self.left = None
		self.right = None
```
