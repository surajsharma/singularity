## 1518. [Water Bottles](https://leetcode.com/problems/water-bottles/)

### O(n)

```js 
var numWaterBottles = function (numBottles, numExchange) {
    if (numBottles < numExchange) return numBottles;

    let b = numBottles
    let r = ex = 0

    // got enough bottles to exchange
    while (b >= numExchange) {
        ex = Math.floor(b / numExchange)
        // exchange bottles
        r = (b % numExchange) + ex
        // remaining is exchanged plus could not be exchanged
        b = r
        // next iteration on remaining bottles
        numBottles += ex
        // add total exchanged
    }

    return numBottles;
};

```