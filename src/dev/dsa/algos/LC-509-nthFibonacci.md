- https://leetcode.com/problems/fibonacci-number

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
