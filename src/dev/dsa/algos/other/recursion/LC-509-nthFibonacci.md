# 509. [Fibonacci Number](https://leetcode.com/problems/fibonacci-number)

# O(n) dynamic 

- [[dynamic programming]]

```javascript
/*
lc 509 - nth fibonacci number
 o/p - 0,1,1,2,3,5,8,13
edited: 11 jul 22
anki: 11 jul 22
*/

function getNthFib(n) {
	let prev = 0;
	let next = 1;
	let fib = prev+next;
	
	for(i=prev; i<n-1; i++){
		fib = prev + next;
		prev = next;
		next = fib;
	}
	
	return fib;
}
```

```javascript
function nthFibDynamic(n){
	let f = [0,1];
	for (let i=2; i<n+1; i++){
		f.push(f[i-1]+f[i-2])
	}
	return f[n]
}

```


```python
class Solution:
    def fib(self, n: int) -> int:
        f = [0,1]
        for i in range(2,n+1):
            f.append(f[i-1]+f[i-2])
        return f[n]

```


```py

# fib memoized

def _fib(n, memo):
    
    if n == 1:
        return 1

    if n == 0:
        return 0

    if n in memo:
        return memo[n]

    memo[n] = _fib(n-1, memo) + _fib(n-2, memo)
    return memo[n]

print(_fib(9,{}))
print(_fib(90,{}))
print(_fib(2,{}))
print(_fib(4,{}))

```


```py

# tribonacci

def trib(n):
    return _trib(n, {})

def _trib(n, memo):
    if n == 0:
        return 0

    if n == 1:
        return 1

    if n == 2:
        return 1

    if n in memo:
        return memo[n]

    memo[n] = _trib(n-1, memo) + _trib(n-2, memo) + _trib(n-3, memo)
    return memo[n]

print(trib(2), trib(3), trib(4), trib(10))


```


```py 

# tribonacci with lists

def fib(n):
    f = [0,1,2]
#     take the first two fibs so we have f[0] and f[1]

    for i in range(3,n+2):
#         loop from f[2] to f[n+1]

        f.append(f[i-1]+f[i-2]+f[i-3])
#     append to the lost the sum of last two f

    return f[n]
# return the sum at n

# 0, 1, 1, 2, 3
print(trib(2), trib(3), trib(4), trib(10))


```
