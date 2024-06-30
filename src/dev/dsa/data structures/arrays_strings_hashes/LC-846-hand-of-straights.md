# 1292 [Hand of Straights](https://leetcode.com/problems/hand-of-straights/description/)

## O(n^2)


```js 

var isNStraightHand = function (hand, groupSize) {
    if (hand.length % groupSize) return false;

    let gp = Array.from({
        length: hand.length / groupSize
    }, () => []);

    let s = hand.sort((a, b) => a - b);

    for (g of gp) {
        while (g.length < groupSize) {
            if (!g.length) {
                g.push(s[0]);
                s.splice(0, 1);
            } else {
                let val = s.find(x => x > g[g.length - 1]);
                g.push(val);
                s.splice(s.indexOf(val), 1);
            }
        }
    }

    let check = true;

    for(g of gp){
        if(g.length!=groupSize){
            check = false;
        }

        for(let i = 1; i<g.length; i++){
            if(g[i] != g[i-1]+1){
                check = false;
            }
        }
    }

    return check;
};

```