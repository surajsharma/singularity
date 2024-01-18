//How do you find the second highest number in an integer array? [7, 8, 9, 1, 2]

let arr = [7,8,9,1,2]

let h = -Infinity;
let second_h= -Infinity;

for (var i = 0; i < arr.length; i++) {
	if(arr[i] > h){
		[second_h, h] = [h, arr[i]]
	} else {
		if(arr[i] < h && arr[i] > second_h){
			second_h = arr[i]
		}
	}
} 

console.log(second_h)