## 2582. [Pass the pillow](https://leetcode.com/problems/pass-the-pillow/)

### O(n)

```js 

var passThePillow = function (n, time) {
    let i = 1;
    let dir = false;

    while (time) {
        if (i === n || i == 1) dir = !dir;
        if (dir) i++;
        if (!dir) i--;
        time--;
    }
    return i;
};

```