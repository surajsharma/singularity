- We’ll begin by showing you the two comment styles in WebAssembly. 

- Next, we’ll write the traditional hello world application. 

- We don’t start with hello world because working with strings from within WAT is more challenging than you might expect.

- Then we’ll discuss how to import data from JavaScript into our WebAssembly module using an import object. 

- We’ll look at named and unnamed global and local variables, as well as the data types that WebAssembly supports. 

- We’ll discuss the S-Expression syntax and how the wat2wasm compiler unpacks those S-Expressions when it compiles your code. 

- You’ll delve into conditional logic, including if/else statements and branch tables, and you’ll learn how to use loops and blocks in conjunction with conditional logic.

- By the end of this chapter, you should be able to write simple WebAssembly apps that you can execute from the command line using Node.js.

- `wat2wasm your_file.wat -o your_file.wasm`

# WAT variables

## Global vars and type conversion

WAT has four global and local variable types: 
- i32 (32-bit integer), 
- i64 (64-bit integer), 
- f32 (32-bit floating-point), and 
- f64 (64-bit floating-point). 

- Strings and more sophisticated data structures need to be managed directly in linear memory

- JavaScript treats all numbers as 64-bit floating-point numbers. When you call a JavaScript function from WebAssembly, the JavaScript engine will perform an implicit conversion to a 64-bit float, no matter what data type you pass. However, WebAssembly will define the imported function as having a specific data type requirement. Even if you pass the same function into the WebAssembly module three times, you’ll need to specify a type that the parameter passed from WebAssembly

- Addition, subtraction, and multiplication typically perform three to five times faster with integers. Dividing by powers of two is also several times faster. However, division by anything but a power of two can be faster with floating-point numbers.

## Local variables

- In WebAssembly, the values stored in local variables and parameters are pushed onto the stack with the local.get expression. 


## Unpacking S-expressions 

### Indexed variables
### Converting between types
### if/else conditional Logic

```
;; This code is for demonstration and not part of a larger app
(if (local.get $bool_i32)
  (then
    ;; do something if $bool_i32 is not 0
    ;; nop is a 'no operation' opcode.  
    nop ;; I use it to stand in for code that would actually do something.
  )
  (else
    ;; do something if $bool_i32 is 0
    nop
  )
)

(if
  (i32.and
    (i32.gt_s (local.get $x) (local.get $y) ) ;; signed greater than
    (i32.lt_s  (local.get $y) (i32.const 6) ) ;; signed less than
  )
  (then
    ;; x is greater than y and y is less than 6
    nop
  )
)
```
## Loops and blocks

If you want your code to jump backward, you must put your code inside a loop. If you want your code to jump forward, you must put it inside a block.

### The Block Statement
### The loop expression
### using block and loop together

[[ex 05/index]]

### branching with br_tables
Another way to use the block expression in WAT is in conjunction with a br_table expression, which allows you to implement a kind of `switch statement`. It’s meant to provide the kind of jump table performance you get with a switch statement when there are a large number of branches. The br_table expression takes a list of blocks and an index into that list of blocks. It then breaks out of whichever block your index points to. The awkward thing about using a branch table is that the code can only break out of a block it’s inside. That means you must declare all of your blocks ahead of time.

```
;; This code is for demonstration and not part of a larger app
1 (block $block_0
(block $block_1
(block $block_2
(block $block_3
(block $block_4
(block $block_5
2 (br_table $block_0 $block_1 $block_2 $block_3 $block_4 $block_5
  (local.get $val)
)
3 ) ;; block 5
i32.const 55
return

)   ;; block 4
i32.const 44
return

)    ;; block 3
i32.const 33
return

)    ;; block 2
i32.const 22
return

)    ;; block 1
i32.const 11
return

)   ;; block 0
i32.const 0
return

```

# functions and tables

- A WebAssembly module interacts with the embedding environment using imported and exported functions. 

- Function calls will always result in some lost computing cycles. But it’s necessary to know that a WebAssembly module will lose more cycles when calling an imported JavaScript function than when calling a function defined inside your WebAssembly module.

- Every function we’ve defined up to this point includes the (export) expression to export the function so JavaScript can call it. However, not every function should use export.

- `Every call to a WebAssembly function from JavaScript incurs an overhead cost so you generally wouldn’t export WAT functions that do only small tasks. Small functions that don’t use many computing cycles might be better kept in the JavaScript to reduce overhead. Make sure your WAT code does as much as possible before returning to JavaScript; smaller functions shouldn’t use export.
  
- The WAT functions most suited for exporting are those that loop over and process a lot of data. 
  
- We recommend using many WAT functions in the early versions of your code to aid in the debugging process.
  
-  As you tune your code for performance, you might decide to remove some of these functions by placing their code inline wherever the function had been called. 
  
-  Any internal function that’s called thousands of times from your exported WebAssembly function is a good candidate for moving inline.


[[ex 06/index]]


[//begin]: # "Autogenerated link references for markdown compatibility"
[ex 05/index]: <ex 05/index> "index"
[ex 06/index]: <ex 06/index> "index"
[//end]: # "Autogenerated link references"