```py 
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [1] * n

        # prefix pass
        prefix = 1
        for i in range(n):
            answer[i] = prefix
            prefix = prefix*nums[i]

        # suffix pass
        suffix = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= suffix
            suffix *= nums[i]

        return answer
```

- [explain](https://chatgpt.com/share/68cbbdf8-7ab0-800b-b541-424037778bca)