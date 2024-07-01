# [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/)

## O(n)

```js

var maxProfit = function (prices) {
    let min_price = Infinity;
    let max_profit = 0;

    for (let i = 0; i < prices.length; i++) {

        if (prices[i] < min_price) {
            min_price = prices[i];
        }

        profit = prices[i] - min_price;

        if (profit > max_profit) {
            max_profit = profit;
        }
    }

    return max_profit;
};

```


- rust 

```rust 

impl Solution {
    pub fn max_profit(prices: Vec<i32>) -> i32 {
        let mut min_price = i32::MAX;
        let mut max_profit = 0;
        
        for price in prices {
            if (price < min_price) {
                min_price = price;
            }
            
            let profit = price - min_price;

            if (profit > max_profit) {
                max_profit = profit;
            }
        }
        max_profit
    }
}

```
