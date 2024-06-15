```python
#!/usr/bin/env python3
# find the kth minimum number in array

A = [9, 1, 0, 8, 1, 0, 3, 2, 9, 5]

def sortArray(a):
    if len(a) <= 1:
        return a
    else:
        b = list(a)
        m = min(b)
        b.remove(m)
        return [m] + sortArray(b)

    return


def kthMin(array, k):
    sorted = sortArray(array)
    dedup = list(set(sorted))
    print(dedup[k], k, dedup)

kthMin(A, 4)```