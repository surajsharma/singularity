## Drop Order 

- Rust automatically drops values when they go out of scope, such as x1 and y1 in the inner scope in [Listing 1-3](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=83bbb810f1db03dd8f2ca01113788236)
- variables (including function arguments) are dropped in reverse order, and nested values are dropped in source-code order.
- Say you write a function that declares a string and then inserts a reference to that string into a new hash table. 
- When the function returns, the hash table must be dropped first; if the string were dropped first, the hash table would then hold an invalid reference! 
-  > 💡 In general, later variables may contain references to earlier values, whereas the inverse cannot happen due to Rust’s lifetime rules. And for that reason, Rust drops variables in reverse order.
-  Unlike for variables, there is no need to reverse the drop order in the case of arrays, tuples, structs, since Rust doesn’t (currently) allow self-references in a single value.