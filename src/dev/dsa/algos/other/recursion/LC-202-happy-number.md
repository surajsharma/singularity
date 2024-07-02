- https://leetcode.com/problems/happy-number
- O(n)


```js
var isHappy = function(n) {
    if(n == 1 || n == 7) return true;
    if(n < 10) return false;

    let p = (""+n).split("");
    let sos = 0;

    for(let i=0; i<p.length; i++){
        sos += parseInt(p[i]) * parseInt(p[i]);
    }
    return isHappy(sos);
};

```