#!/usr/bin/env python3

#53. Maximum Subarray
# find the maximum sum of any contiguous subarray

A = [34, -50, 42, 14, -5, 86] # 137, [42,14,-5,86]
B = [-1, -2, -3, -4] #0
C = [-2,1,-3,4,-1,2,1,-5,4] #6
D = [1]#1
E = [5,4,-1,7,8] #23
F = [8,-1,3,4] #15

def maxSubarrayCircular(nums):
	sum_all = sum(nums)
	min_sum = minSubarraySum(nums)
	max_sum = maxSubarraySum(nums)
	max_circ_sum = sum_all - min_sum
	return max(max_circ_sum, max_sum)

def maxSubarraySum(nums):
	max_here = max_sofar = -float("inf")
	for i,x in enumerate(nums):
		max_here = max(x, x + max_here)
		max_sofar = max(max_sofar, max_here)
	return 0 if max_sofar < 0 else max_sofar

def minSubarraySum(nums):
	min_here = min_sofar = float("inf")
	for i,x in enumerate(nums):
		min_here = min(x, x + min_here)
		min_sofar = min(min_sofar, min_here)
	return min_sofar

print(maxSubarraySum(A))
print(maxSubarraySum(B))
print(maxSubarraySum(C))
print(maxSubarraySum(D))
print(maxSubarraySum(E))
print(maxSubarrayCircular(F))