# 56. [Merge Intervals](https://leetcode.com/problems/merge-intervals/description/)

## O(nlog(n))

```js

var merge = function (intervals) {
    intervals.sort((a, b) => [a[0] - b[0]]);
    let m = []

    for (i in intervals) {
        if (m.length === 0 || m[m.length - 1][1] < intervals[i][0]) {
            m.push(intervals[i]);
        } else {
            m[m.length - 1] = [m[m.length - 1][0], Math.max(m[m.length - 1][1], intervals[i][1])]
        }
    }

    return m;
};


```