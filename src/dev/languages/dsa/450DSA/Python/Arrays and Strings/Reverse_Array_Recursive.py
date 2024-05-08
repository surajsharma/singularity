def ReverseString(A, start, end):
    # set start[0] and end[-1]
    # swap start and end
    if(start >= end):
        return
    else:
        A[start], A[end] = A[end], A[start]
        ReverseString(A, start+1, end-1)


A = [1, 2, 3, 4, 5, 6, "A"]
print(A)
ReverseString(A, 0, 6)
print("Reversed list is")
print(A)
