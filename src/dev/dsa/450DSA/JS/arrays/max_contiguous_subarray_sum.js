function maxContiguousSum (arr) {
	
	let length = arr.length
	let max = Math.pow(2, 53)
	let max_sum = -max -1
	let sum_here = 0
	
	for (var i = 0; i < length; i++) {
		
		sum_here = sum_here + arr[i]
		console.log(arr[i], sum_here)
		
		if(max_sum < sum_here) {
			max_sum = sum_here
		}

		if(sum_here < 0) {
			sum_here = 0
		}
	}
	return 	max_sum
}


let arr = [-2,-3,4,-1,-2,1,5,-3]
console.log(maxContiguousSum(arr))