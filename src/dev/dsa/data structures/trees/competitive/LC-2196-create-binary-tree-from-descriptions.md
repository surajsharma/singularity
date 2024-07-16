## 2196. [Create Binary Tree From Descriptions](https://leetcode.com/problems/create-binary-tree-from-descriptions)

### O(n)

```js 

var createBinaryTree = function(descriptions) {
    const nodes={}, noParent={}

    for(let i =0 ; i<descriptions.length; i++){

        const parent=descriptions[i][0]
        const child=descriptions[i][1]
        const isLeft=descriptions[i][2]

        const parentNode = nodes[parent] || new TreeNode(parent,null,null)
        const childNode = nodes[child] || new TreeNode(child,null,null)

        if(!nodes[parent]){
             nodes[parent]= parentNode
             noParent[parent] =parentNode
        }

        if(!nodes[child]){
            nodes[child]= childNode

        }
        delete noParent[child]

        if(isLeft===1){
            parentNode.left=childNode
        }else{
            parentNode.right=childNode
        }
    }

    return Object.values(noParent)[0]
};

```