- https://leetcode.com/problems/single-number/


# Naive O(n)

```javascript
    let counter = {};

    nums.forEach((num,i)=> {
        if(num in counter) {
            counter[num] = counter[num] + 1;
        } else {
            counter[num] = 1;
        }
    })

    for (k in counter){
        if(counter[k]==1) return k;
    }
```


# XOR O(n)

```javascript
    let result = 0;
    for (let num of nums) {
        //Hint : XOR of two equal numbers gives 0 :)
        result ^= num;
    }

    return result;
```


```rust 

impl Solution {
    pub fn single_number(nums: Vec<i32>) -> i32 {
    let mut result = 0;
    for num in nums.iter() {
        // Use bitwise XOR for efficient single number detection
        result ^= *num;
    }
    result        
    }
}

```