## Chapter 4: Understanding Ownership 

- [Chapter 4: Understanding Ownership](#chapter-4-understanding-ownership)
  - [What Is Ownership?](#what-is-ownership)
    - [Ownership Rules](#ownership-rules)
    - [Variable Scope](#variable-scope)
    - [The String Type](#the-string-type)
    - [Memory and Allocation](#memory-and-allocation)
    - [Ownership and Functions](#ownership-and-functions)
    - [Return Values and Scope](#return-values-and-scope)
  - [References and Borrowing](#references-and-borrowing)
    - [Mutable References](#mutable-references)
    - [Dangling References](#dangling-references)
    - [The Rules of References](#the-rules-of-references)
  - [The Slice Type](#the-slice-type)
    - [String Slices](#string-slices)
    - [Other Slices](#other-slices)
  - [Summary](#summary)


### What Is Ownership? 
#### Ownership Rules 
#### Variable Scope 
#### The String Type 
#### Memory and Allocation 
#### Ownership and Functions 
#### Return Values and Scope 

### References and Borrowing 
#### Mutable References 
#### Dangling References 
#### The Rules of References 

### The Slice Type 
#### String Slices 
#### Other Slices 

### Summary 


```rust 

fn ch_4(){
	let mut str_lit = String::from("hello");
	str_lit.push_str(", world");
	
	println!("{}",str_lit);	
	
	let word = first_word(&str_lit);
	
	//str_lit.clear();
	
	println!("{}",word);
	
	fn first_word(s: &str) -> &str {
		let bytes = s.as_bytes();
		
		for (i, &item) in bytes.iter().enumerate() {
			if item == b' ' {
				return &s[0..i];
			}
		}
		
		&s[..]
	}
}

```
