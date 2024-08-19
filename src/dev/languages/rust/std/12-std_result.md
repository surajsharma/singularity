```rust
/*  Result is a richer version of Option used for error handling. 
    It returns either Ok(T) if operations are successful, where T is the value, 
    or Err(E) if they fail, where E is the error. 
    It is widely used in situations where an operation might fail, and
    you need to handle both the successful and error cases distinctly.
*/

fn calculate_division(dividend: i32, divisor: i32) -> Result<i32, & 'static str> {
	/* 'static is a lifetime specifier meaning this reference is valid for the entire duration of the program 
	    The 'static lifetime is often used for error messages that are hardcoded into the program and thus live 
	    for the entire duration of the program run. 
	*/

    if divisor == 0 {
        Err("Cannot divide by zero")
    } else {
        Ok(dividend / divisor)
    }
}

fn main() {
    let _result = calculate_division(10, 0);

    let result = calculate_division(10, 10);

    match result {
        Ok(value) => println!("Division result: {}", value),
        Err(e) => println!("Error: {}", e),
    }
}

```
