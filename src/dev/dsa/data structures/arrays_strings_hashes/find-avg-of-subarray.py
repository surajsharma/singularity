def find_avg_of_subarray(K, arr):
    result = []

#    
#   print(len(arr)-K+1, len(arr), K+1, range(len(arr)-K+1))

    for i in range(len(arr)-K+1): 
        #for the array
        _sum = 0.0
        for j in range(i, i+K): 
            #for each subarray
            _sum += arr[j]
        result.append(_sum/K) 
        #calculate average

    return result

def main():
    result = find_avg_of_subarray(5,[1, 3, 2, 6, -1, 4, 1, 8, 2])
    print("Averages of subarrays of size K : " + str(result))


main()
