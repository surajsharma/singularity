function findClosestValueInBst(tree, target) {
  // Write your code here.
  
  let min_diff = 0;
  let sol = 0;
  
  tree.tree.nodes.forEach((n,i) => {
    if(n.value == target){
      sol = n.value
    }
    
    if(min_diff > Math.abs(n.value - target)){
      min_diff = 
    }
  })
  
  return sol
}

// This is the class of the input tree. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


let o = {
  "tree": {
    "nodes": [
      {"id": "10", "left": "5", "right": "15", "value": 10},
      {"id": "15", "left": "13", "right": "22", "value": 15},
      {"id": "22", "left": null, "right": null, "value": 22},
      {"id": "13", "left": null, "right": "14", "value": 13},
      {"id": "14", "left": null, "right": null, "value": 14},
      {"id": "5", "left": "2", "right": "5-2", "value": 5},
      {"id": "5-2", "left": null, "right": null, "value": 5},
      {"id": "2", "left": "1", "right": null, "value": 2},
      {"id": "1", "left": null, "right": null, "value": 12}
    ],
    "root": "10"
  },
  "target": 12
}

console.log(findClosestValueInBst(o, 12))