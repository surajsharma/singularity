- https://sunjetliu.medium.com/algorithm-practice-find-averages-of-subarrays-db9108c0d55e

- bruteforce O(n*k)
- sliding window O(n)

```python 
#!/usr/bin/env python3
def find_avg_of_subarray(K, arr):
    result = []
    
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
    A = [1, 3, 2, 6, -1, 4, 1, 8, 2]
    result = find_avg_of_subarray(5,A)
    swresult = sw_find_averages_of_subarrays(5,A)
    print("Averages of subarrays of size K : " + str(result))

main()
```


- sliding window (js)

```js
function sw_find_averages_of_subarrays(K, arr) {
  const result = [];
  let windowSum = 0.0,
      windowStart = 0;
  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // add the next element
    if (windowEnd >= K - 1) {
      result.push(windowSum / K); 
      windowSum -= arr[windowStart]; 
      windowStart += 1; 
    }
  }
  return result;
}
```