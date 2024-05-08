#!/usr/bin/env python3

def containsDuplicate(nums: [int]) -> bool:
	return len(nums) == len(set(nums))

print(containsDuplicate([1,2,3,4,4]))