/*
My Solution
@solved Monday, Jul 11, 2022
*/

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

/*
@optimal solution
notes: Uses Set
*/

var containsDuplicate = function(nums) {
    return [...new Set(nums)].length !== nums.length;
};