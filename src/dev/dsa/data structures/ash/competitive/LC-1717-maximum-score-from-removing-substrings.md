## 1717. [Maximum Score From Removing Substrings](https://leetcode.com/problems/maximum-score-from-removing-substrings/description/)

### O(n)

- optimised for large strings 

```js 

var maximumGain = function (s, x, y) {
    let a = 'a'.charCodeAt(0);
    let b = 'b'.charCodeAt(0);
    let stack = [];
    let points = 0;
    let [first, second, firstPoints, secondPoints] = x > y ? [b, a, x, y] : [a, b, y, x];

    for (let i = 0; i < s.length; i++) {
        let char = s.charCodeAt(i);
        if (stack.length && char === first && stack[stack.length - 1] === second) {
            stack.pop();
            points += firstPoints;
        } else {
            stack.push(char);
        }
    }

    let newStack = [];
    for (let i = 0; i < stack.length; i++) {
        if (newStack.length && stack[i] === second && newStack[newStack.length - 1] === first) {
            newStack.pop();
            points += secondPoints;
        } else {
            newStack.push(stack[i]);
        }
    }

    return points;
};

```


- time limit exceeded

```js 

/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */

var maximumGain = function (s, x, y) {
    let s1 = s2 = ""
    let p = 0
    let xory = x > y

    for (char of s) {
        if (s1 != "") {
            if (xory) {
                //ab
                if (s1[s1.length - 1] == "a" && char == "b") {
                    s1 = s1.slice(0, -1)
                    p += x
                } else {
                    s1 += char
                }
            } else {
                //ba
                if (s1[s1.length - 1] == "b" && char == "a") {
                    s1 = s1.slice(0, -1)
                    p += y
                } else {
                    s1 += char
                }
            }
        } else {
            s1 += char
        }
    }

    for (char of s1) {
        if (s2 != "") {
            if (!xory) {
                //ab
                if (s2[s2.length - 1] == "a" && char == "b") {
                    s2 = s2.slice(0, -1)
                    p += x
                } else {
                    s2 += char
                }
            } else {
                //ba
                if (s2[s2.length - 1] == "b" && char == "a") {
                    s2 = s2.slice(0, -1)
                    p += y
                } else {
                    s2 += char
                }
            }
        } else {
            s2 += char
        }
    }

    return p
};

```