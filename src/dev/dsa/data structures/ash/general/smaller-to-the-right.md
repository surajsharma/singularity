// Problem: all elements which have only smaller elements to their right 


```js
let arr = [2, 5, 8, 12, 7, 9, 3, 2]
let final = []
let next;

for (let i = 0; i < arr.length; i++) {
	//for each element
	next = -1
	//set next to -1
	for (let j = i; j < arr.length; j++) {
		// iterate the rest
		if (arr[j] > arr[i]) {
			//if next is bigger
			next = arr[i]
			//set next to i and break
			break
		}
	}

	if (next == -1) {
		//i didn't change in inner loop, all elements were iterated
		final.push(arr[i])
	}
}
```

```js
// recursively

function g(arr) {
	if (arr.length === 1) {
		final.push(arr[0])
		return;
	}
	else {
		arr.forEach((num, i) => {
			if (num > arr[i + 1]) {
				final.push(num)
			}
			arr.splice(0, 1)
			g(arr)
		})
	}

}

g(arr)
console.log(final)
```
