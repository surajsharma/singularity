#!/usr/bin/env python3

g = {
	'f':['i','g'],
	'g':['h'],
	'h':[],
	'i':['k','g'],
	'j':['i'],
	'k':[]
}



def has_path(graph, src, dst):
	if src == dst:
		return True
	
	stack = graph[src]
	
	while len(stack) > 0 :
		current = stack.pop(0)
		if current == dst:
			return True
		else:
			for neighbour in graph[current]:
				stack.append(neighbour)
	return False
				
				
print(has_path(g, 'f', 'k'))
print(has_path(g, 'j', 'f'))