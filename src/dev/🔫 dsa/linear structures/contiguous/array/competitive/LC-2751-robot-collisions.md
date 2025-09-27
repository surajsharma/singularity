## 2751. [Robot Collitions](https://leetcode.com/problems/robot-collisions/)

### O(n log n)


```python

class Solution:
    def survivedRobotsHealths(self, positions: List[int], healths: List[int], directions: str) -> List[int]:

        # create map
        index_map = {p:i for i,p in enumerate(positions)}
        stack = []

        # iterate/detect collisions with stack
            # calculate healths

        for p in sorted(positions):
            i = index_map[p]

            if directions[i] == "R":
                # going right never will collide
                stack.append(i)
            else:
                while stack and healths[i]:
                    i2 = stack.pop()
                    if healths[i] > healths[i2]:
                        healths[i2] = 0
                        healths[i] -= 1
                    elif healths[i] < healths[i2]:
                        healths[i] = 0
                        healths[i2] -= 1
                        stack.append(i2)
                    else:
                        healths[i] = healths[i2] = 0

        return [h for h in healths if h > 0]

```