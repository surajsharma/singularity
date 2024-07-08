## 217. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

### O(n*n)

```js
var containsDuplicate = function(nums) {
    for(let i=0; i<nums.length; i++){
        for(let j=i+1; j<nums.length; j++){
            if(nums[i]===nums[j]){
                return true;
            }
        }
    }
    return false;
};

console.log(containsDuplicate([1,2,3,4]))
```

### O(n)

```js
var containsDuplicate = function(nums) {
    return [...new Set(nums)].length !== nums.length;
};
```

```python
def containsDuplicate(nums: [int]) -> bool:
	return len(nums) != len(set(nums))

print(containsDuplicate([1,2,3,4,4]))
```
