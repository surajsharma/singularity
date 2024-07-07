
```js
function isValidSubsequence(array, sequence) {
  count = 0;

  if (JSON.stringify(array) === JSON.stringify(sequence)) {
    return true;
  }


  if (sequence.length > array.length) {
    return false;
  }

  uSeq = [...new Set(sequence)];

  uSeq.forEach((a, i1) => {
    array.forEach((ai, i2) => {
      if (ai == a) {
        count += 1;
      }
    })
  })

  if (count >= sequence.length && sequence.length !== array.length) {
    return true;
  } else {
    return false;
  }
}

let a = [5, 1, 22, 25, 6, -1, 8, 10]
let s = [1, 6, -1, -1, 10]
let i = [-1, 6, 25]
console.log(isValidSubsequence(a, s)) //f
console.log(isValidSubsequence(a, i)) //t
```