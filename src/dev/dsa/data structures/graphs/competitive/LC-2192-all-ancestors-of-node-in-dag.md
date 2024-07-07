## 1292. [All Ancestors of a Node in a Directed Acyclic Graph](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph)

### O(n^2)


```js 

var map = Array.from({ length: n }, () => new Set());
var res = Array.from({ length: n }, () => []);
var visited = new Uint8Array(n);

var dfs = (v, p) => {
    visited[v] = 1;
    if (v !== p) res[v].push(p);
    for (var x of map[v]) if (!visited[x]) dfs(x, p);
};

edges.forEach(([u, v]) => map[u].add(v));
for (let i = 0; i < n; ++i) visited.fill(0), dfs(i, i);
return res;

```