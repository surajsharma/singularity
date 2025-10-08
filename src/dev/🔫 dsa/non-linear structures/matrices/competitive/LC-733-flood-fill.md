## 733. [✅ Flood Fill](https://leetcode.com/problems/flood-fill/)

### O(n*m)

- using dfs aka NEIGHBOURS

```python
class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:

        m, n = len(image), len(image[0])
        start_color = image[sr][sc]

        # base case: incoming color is same as extant
        if start_color == color:
            return
        
        def dfs(i,j):
            if i < 0 or i >= m or j < 0 or j >= n or image[i][j] != start_color:
                return
            image[i][j] = color
            dfs(i-1,j)
            dfs(i+1,j)
            dfs(i,j-1)
            dfs(i,j+1)
        
        dfs(sr,sc)
        return image
```

- using bfs aka LEVELS

```python

class Solution:
    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:
        # get the matrix rows/cols 

        m, n = len(image), len(image[0])
        
        # get start color
        start_color = image[sr][sc]

        #base case
        if start_color == color:
            return image
        
        # traversal
        def bfs(level):
            if not level:
                return
            
            next_level = []

            for i, j in level:
                if 0 <= i < m and 0 <= j < n and image[i][j] == start_color:
                    image[i][j] = color
                    next_level.extend([(i-1, j), (i+1, j), (i, j-1), (i, j+1)])
            
            bfs(next_level)
        
        bfs([(sr, sc)])
        return image

```

## notes

- python's `extend` vs `append`
  - `extend()` adds all elements from an iterable to a list. It's different from `append()`:
    ```python
    # append() adds the whole object as one element
    lst = [1, 2]
    lst.append([3, 4])
    # lst is now [1, 2, [3, 4]]

    # extend() adds each element individually  
    lst = [1, 2]
    lst.extend([3, 4])
    # lst is now [1, 2, 3, 4]
    ```

  - in bfs this line could be substituted

    ```python
    next_level.extend([(i-1, j), (i+1, j), (i, j-1), (i, j+1)])
    ```

  - with:
    ```python
    next_level.append((i-1, j))
    next_level.append((i+1, j))
    next_level.append((i, j-1))
    next_level.append((i, j+1))
    ```

  - Or with `+=` (which also extends):

    ```
    next_level += [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]
    ```

  - so the dfs above using extend would be:

    ```python
    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n or image[i][j] != start_color:
            return
        
        image[i][j] = color
        
        neighbors = []
        neighbors.extend([(i-1, j), (i+1, j), (i, j-1), (i, j+1)])
        
        for ni, nj in neighbors:
            dfs(ni, nj)
    ```
