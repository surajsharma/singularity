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