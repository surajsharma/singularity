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
