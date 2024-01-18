graph = {
    'a': ['b', 'c'],
    'b': ['d'],
    'c': ['e'],
    'd': ['f'],
    'e': [],
    'f': []
}

def depthFirstPrint(graph, source):
    print(source)
    for neighbour in graph[source]:
        depthFirstPrint(graph, neighbour)


depthFirstPrint(graph, 'a')
