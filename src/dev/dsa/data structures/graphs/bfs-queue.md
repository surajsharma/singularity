```python
#!/usr/bin/env python3

graph = {
	'a': ['c', 'b'],
	'b': ['d'],
	'c': ['e'],
	'd': ['f'],
	'e': [],
	'f': []
}

def breadthFirstPrint(graph, source):
	queue = graph[source]
	print(source)
	while len(queue) > 0:
		current = queue.pop(0)
		print(current)
		for neighbour in graph[current]:
			queue.append(neighbour)
			
		
breadthFirstPrint(graph, 'a')```