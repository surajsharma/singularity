```python
#!/usr/bin/env python3
def ReverseArray(A, start, end):
    while(start < end):
        A[start], A[end] = A[end], A[start]
        start += 1
        end -= 1

def ReverseListPythonic(A):
    return A[::-1]

A = [1, 2, 3, 4, 5, 6]
print(A)
B = ReverseListPythonic(A)
print("Reversed list is")
print(B)
```

- recursive 

```python 
#!/usr/bin/env python3
def ReverseListRecursive(A, start, end):
    # set start[0] and end[-1]
    # swap start and end
    if(start >= end):
        return
    else:
        A[start], A[end] = A[end], A[start]
        ReverseString(A, start+1, end-1)

A = [1, 2, 3, 4, 5, 6, "A"]
print(A)
ReverseListRecursive(A, 0, 6)
print("Reversed list is")
print(A)
```