# 1791. [Find Center of Star Graph](https://leetcode.com/problems/find-center-of-star-graph)

## O(1)

```js 

var findCenter = function(edges) {
    if (edges[0][0] === edges[1][0] || edges[0][0] === edges[1][1]) {
        return edges[0][0];
    } else {
        return edges[0][1];
    }
};

```

## O(n)

```js 
var findCenter = function (edges) {
    let center = edges[0][0];
    for (let i = 1; i < edges.length; i++) {

        let [l, r] = edges[i];
        let [pl, pr] = edges[i - 1];

        switch (0) {
            case (l ^ pl):
                center = l;
                break;
            case (r ^ pr):
                center = r;
                break;
            case (l ^ pr):
                center = l;
                break;
            case (r ^ pl):
                center = r;
                break;
        }
    }
    return center;
};

```