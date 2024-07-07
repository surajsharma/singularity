## 338. [Counting Bits](https://leetcode.com/problems/counting-bits/)

### O(n)

```js
var countBits = function(n) {
    let bits = [];
    for (let i = 0; i <= n; i++)
        // remove 0 from bits
        bits.push(
            Number(i)
            .toString(2)
            .replace(/0/g, '')
            .length);
    return bits;    
};

```