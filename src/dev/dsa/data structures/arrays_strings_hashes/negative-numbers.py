#!/usr/bin/env python3
A = [1, 2, 3, 0, -1, -2, -3]

def shiftNegs(A, i):
    if i >= len(A):
        return A

    if A[i] < 0:
        A.remove(A[i])
        print(A[i], i)

    return shiftNegs(A, i+1)


B = shiftNegs(A, 0)
print(B)
