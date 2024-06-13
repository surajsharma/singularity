# LC278
# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        left = 0
        right = n
        lbv = None

        while left <= right:
            mid = (left+right) // 2
            fbv = isBadVersion(mid)

            if fbv:
                right = mid - 1
                lbv = mid
            else:
                left = mid + 1
        return lbv