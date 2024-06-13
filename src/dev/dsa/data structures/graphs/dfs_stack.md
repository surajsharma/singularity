```js

const graph = {
	"a":["c","b"],
	"b":[],
	"c":["e","d"],
	"d":["b","e"],
	"e":["b"]
};

((graph, node) => {
	let stack = [node];
	//step 1: init stack as array with only node memeber
	while(stack.length){
		// step 2: while stack has members
		popped = stack.pop();
		// step 3: pop one out ...
		console.log(popped);
		// step 4: print it ...
		for (neighbour of graph[popped]){
			// step 5: push all elements of popped in stack
			stack.push(neighbour)
		}
	}
})(graph, 'a');


```