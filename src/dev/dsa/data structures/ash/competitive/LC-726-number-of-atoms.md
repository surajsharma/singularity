## 726. [Number of atoms](https://leetcode.com/problems/number-of-atoms/description/)

```js
var countOfAtoms = function (formula) {
  const hashmap = {};
  const stack = [];

  for (let i = 0; i < formula.length; i++) {
    let char = formula[i];
    let nextChar = formula[i + 1];

    // alpha
    if (char >= "A" && char <= "Z") {
      if (nextChar >= "a" && nextChar <= "z") {
        stack.push(char + nextChar);
        i++;
      } else {
        stack.push(char);
      }

      if (formula[i + 1] < "1" || formula[i + 1] > "9") {
        stack.push(1);
      }
    }

    // numeric
    if (char >= "1" && char <= "9") {
      let digits = char;
      while (nextChar >= "0" && nextChar <= "9") {
        digits += nextChar;
        i++;
        nextChar = formula[i + 1];
      }

      stack.push(+digits);
    }

    // open parentheses
    if (char === "(") {
      stack.push(char);
    }

    // close parentheses
    if (char === ")") {
      let multiply = "";

      if (nextChar >= "1" && nextChar <= "9") {
        multiply += nextChar;
        i++;
        nextChar = formula[i + 1];
        while (nextChar >= "0" && nextChar <= "9") {
          multiply += nextChar;
          i++;
          nextChar = formula[i + 1];
        }
      }

      if (multiply === "") {
        multiply = 1;
      }

      multiply = +multiply;

      // find open parantheses
      let pointer = stack.length - 1;
      while (true) {
        if (typeof stack[pointer] === "number") {
          stack[pointer] = stack[pointer] * multiply;
        }

        if (stack[pointer] === "(") {
          stack[pointer] = "";
          break;
        }

        pointer--;
      }
    }
  }

  // loop through the stack and insert it into hashmap
  for (let i = 0; i < stack.length; i++) {
    if (stack[i] === "") {
      continue;
    }

    if (typeof stack[i] === "string") {
      const symbol = stack[i];
      const count = !stack[i + 1] ? 1 : stack[i + 1];

      if (hashmap[symbol]) {
        hashmap[symbol] += count;
      } else {
        hashmap[symbol] = count;
      }
    }
  }

  const res = Object.keys(hashmap)
    .sort()
    .reduce((str, key) => {
      str += `${key}${hashmap[key] === 1 ? "" : hashmap[key]}`;
      return str;
    }, "");

  return res;
};
```

- with regex/python

```python

class Solution:
    def countOfAtoms(self, s: str) -> str:
        pattern = r'([A-Z][a-z]*)(\d*)'

        def f(m):
            def ff(mm):
                return mm[1] + str(int(mm[2] or '1')*int(m[2] or '1'))

            return re.sub(pattern, ff, m[1])
        
        while '(' in s:
            s = re.sub(r'\((\w+)\)(\d*)', f, s)

        c = sum((Counter({m[1]: int(m[2] or 1)}) for m in finditer(pattern, s)), Counter())
        
        return ''.join(e + str(c)*(c>1) for e,c in sorted(c.items()))
```