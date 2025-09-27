- [Coercion](#coercion)
  - [ToPrimitive](#toprimitive)
    - [valueOf](#valueof)
  - [ToNumber](#tonumber)
  - [ToString](#tostring)
  - [ToBoolean](#toboolean)
  - [Summary of abstract equality operator	==](#summary-of-abstract-equality-operator)
    - [rules of ==](#rules-of-)
  - [Relational operators](#relational-operators)
    - [Operator Precedence](#operator-precedence)


## Coercion

- conversion of one type of value into another type of value.
- if the conversion of values is implicit, then it is coercion, whereas type conversion can either be __implicit__ or __explicit__.
- an example of an explicit type ___conversion___
- `const age = Number(ageStr)`
- where the developer expressed no intention to convert, example of ___coercion___
- `const result = "50" - 20; // 30`


### ToPrimitive	

#### valueOf 

- default implementation of this method, like the toString method is useless

-  returns the object on which this method is called.

- It is meant to be overridden by other objects. 
- Many built-in objects override this method. 
- For example, for the Date objects, this method returns the number of milliseconds since midnight 01 January 1, 1970 UTC.
- `new Date().valueOf(); // 1675526929129`

### ToNumber	

- "" -> 0
- "0" -> 0
- "-0" -> -0
- " 123 " -> 123
- "45" -> 45
- "abc" -> NaN
- false -> 0
- true -> 1
- undefined -> NaN
- null -> 0

### ToString	

- null -> "null"
- undefined -> "undefined"
- 0 -> "0"
- -0 -> "0"
- true -> "true"
- false -> "false"
- 123 -> "123"
- NaN -> "NaN"

### ToBoolean	

- simply a lookup of whether a value is a falsy
- ___falsy values are___:
  - `null`
  - `undefined`
  - `NaN`
  - `0`,`-0`,`0n`
  - `false` 
  - `""`

### Summary of abstract equality operator	==

- This operator is infamous because many resources online

- JavaScript developers, in general, discourage its use because of its coercive behavior.

#### rules of ==

1. If the values being compared are of the same type, then perform the strict equality comparison⁶⁶ ===

2. If one value is undefined or null and the other value is also undefined or null, return true `console.log(null === undefined); // false` ___so only check for either null or undf___

3. If one or both values are objects, they are converted into primitive types, preferring the number type

4. If both values are primitives but are of different types, convert the types until they match, preferring the number type for coercing values


```js 

const someVal = {};

if (someVal == true) {
  console.log("true");
} else {
  console.log("false");
}

// else 

// 1. rule 4: someVal == 1
// 2. rule 4: "[obj Obj]" == 1
// 3. rule 4: "NaN" == 1
// 4. rule 4: NaN == 1


```

- __NaN value is not equal to any other value, including itself.__


```js 

const someVal = {};

if (someVal) {
  console.log("true");
} else {
  console.log("false");
}

// true

```

### Relational operators	

```js

    console.log([13] == 13);
    // single element coerced -> "13", true

```

```js

    console.log([1] < [2]);
    // true

```

```js 

    console.log([undefined] == 0);
    //"" == 0 -> 0 = 0 -> true

```

#### [Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table)

```js

    console.log([] == ![]);
    // Not operator takes precedence over ==
    // 1) [] -> true -> ! -> false
    // 2) [] == false -> [] == 0 -> "" == 0
    // 3) 0 == 0 = true


```

```js 

    console.log(!!"true" == !!"false");
    //!!+string == !!+string
    //!!true == !!true -> true

```



