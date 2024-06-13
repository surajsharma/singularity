graph = {
    "a":["b","c"],
    "b":["d"],
    "c":["e"],
    "d":[],
    "e":["d"]
}

def dfs_print(graph, node):
    stack = [node];
    
    while(len(stack)):
        current = stack.pop()
        
        print(current)
        
        for neighbour in graph[current]:
            stack.append(neighbour)

dfs_print(graph, 'a')