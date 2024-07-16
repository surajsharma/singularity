## 2096. [Step-By-Step Directions From a Binary Tree Node to Another](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/)

### O(n)

```js

var getDirections = function (root, startValue, destValue) {
    const getPath = (node, value, acc = '') => {
        if (node === null) {
            return '';
        } else if (node.val === value) {
            return acc;
        } else {
            return getPath(node.left, value, acc + 'L') + getPath(node.right, value, acc + 'R')
        }
    }

    // generate the paths
    let startPath = getPath(root, startValue);
    let destPath = getPath(root, destValue);


    // find the lowest common ancestor
    let i = 0;
    for (; i < startPath.length && i < destPath.length && startPath[i] === destPath[i]; i++);

    console.log(startPath,"-", destPath,i)

    // output the final path
    let output = '';
    for (let j = i; j < startPath.length; j++) {
        output += 'U';
    }

    return output + destPath.substring(i);
};

```