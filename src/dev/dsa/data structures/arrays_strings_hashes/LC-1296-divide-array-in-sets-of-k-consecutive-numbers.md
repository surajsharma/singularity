# 1296. [1296. Divide Array in Sets of K Consecutive Numbers](https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers) 



```js 

var isPossibleDivide = function (nums, k) {
    if (nums.length % k) return false;

    let check = true;

    let gp = Array.from({
        length: nums.length / k
    }, () => []);

    let s = nums.sort((a, b) => a - b);

    for (g of gp) {
        while (g.length < k) {
            if (!g.length) {
                g.push(s[0]);
                s.splice(0, 1);
            } else {
                let val = s.find(x => x > g[g.length - 1]);
                g.push(val);
                s.splice(s.indexOf(val), 1);
            }
        }

        if (g.length != k) {
            check = false;
        }

        for (let i = 1; i < g.length; i++) {
            if (g[i] != g[i - 1] + 1) {
                check = false;
            }
        }
    }
    return check;
};

```