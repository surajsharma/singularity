## 268. [Missing Number](https://leetcode.com/problems/missing-number/)

### O(n)


```js 

var missingNumber = function (nums) {
    let m = null;

    for (let i = 0; i <= nums.length; i++) {
        let check = i;
        if (nums.indexOf(check) == -1) {
            m = i;
        }
    }

    return m;


};

```


```js


/**
  One-liner.
  Init the accumulator to nums.length
  Then XOR (^) the current number with the index
  Then XOR equals (^=) with the accumulator
  
  Runtime: 80 ms, faster than 80.75%
  Memory Usage: 41.3 MB, less than 48.27%
*/
    return nums.reduce((acc, cur, i) => acc ^= i ^ cur, nums.length);

```

- [[bit manipulation]]


[//begin]: # "Autogenerated link references for markdown compatibility"
[bit manipulation]: <../../../patterns/bit manipulation> "bit manipulation"
[//end]: # "Autogenerated link references"