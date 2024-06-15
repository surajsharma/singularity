```python

low = [0]
mid = [1]
high = [2]


def sortThreeStates(A, i,):
    if i < 0:
        print(low + mid + high)
        return (low+mid+high)

    if A[i] == low[0]:
        low.append(A[i])

    if A[i] == mid[0]:
        mid.append(A[i])

    if A[i] == high[0]:
        high.append(A[i])

    return sortThreeStates(A[:i], i-1)


A = [0, 2, 1, 2, 0, 0, 0, 1, 1, 2, 1, 2, 0, 1, 0, 1]

sorted = sortThreeStates(A, len(A)-1)
```