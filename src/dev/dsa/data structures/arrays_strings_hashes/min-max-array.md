```python 
#!/usr/bin/env python3
A = [65, 43, 45, 67, 543]

def findMinMax(A):
    min = 0
    max = 0
    for num in A:
        if num < min or min == 0:
            min = num
        if num > max or max == 0:
            max = num
    print('Min: ', min, "Max: ", max)


findMinMax(A)
```


- recursive

```python
#!/usr/bin/env python3
A = [65, 43, 45, 67, 543]

def findMinMaxRec(A, index, mi, ma):
    mi = mi
    ma = ma
    if index == 0:
        if A[index] <= mi:
            mi = A[index]
        if A[index] >= ma:
            ma = A[index]
        print('Min: ', mi, "Max: ", ma)
    else:
        if A[index] <= mi or mi == 0:
            mi = A[index]
        if A[index] >= ma or ma == 0:
            ma = A[index]
        findMinMaxRec(A, index-1, mi, ma)


findMinMaxRec(A, len(A)-1, 0, 0)
```