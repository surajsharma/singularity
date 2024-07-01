## 1550.[Three Consecutive Odds](https://leetcode.com/problems/three-consecutive-odds/description/)

### O(n) 


```js 
var threeConsecutiveOdds = function(arr) {
    let oddcount = 0;
    for(n of arr){
        if (oddcount >= 3) return true;
        
        if(n % 2 != 0){
            oddcount++;
        }

        if(n%2==0){
            oddcount=0;
        }
    }

    return oddcount >= 3;
};
```