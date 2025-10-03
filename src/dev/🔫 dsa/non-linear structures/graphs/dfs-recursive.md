```js

graph = {
    "a": ["b", "c"],
    "b": ["d"],
    "c": ["e"],
    "d": [],
    "e": []
}

function dfs_print(graph, node) {
    console.log(node);
    for (neighbour of graph[node]) {
        dfs_print(graph, neighbour)
    }
}

dfs_print(graph, 'a')
```
- python 

```python
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

```
