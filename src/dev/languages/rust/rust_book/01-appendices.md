- [Chapter 1: Getting Started](#chapter-1-getting-started)
  - [Creating a Project with Cargo](#creating-a-project-with-cargo)
  - [Building and Running a Cargo Project](#building-and-running-a-cargo-project)

- [Appendix A: Keywords](#appendix-a-keywords)
  - [Keywords Currently in Use](#keywords-currently-in-use)
  - [Keywords Reserved for Future Use](#keywords-reserved-for-future-use)
  - [Raw Identifiers](#raw-identifiers)

- [Appendix B: Operators and Symbols](#appendix-b-operators-and-symbols)
  - [Operators](#operators)
  - [Non-operator Symbols](#non-operator-symbols)

- [Appendix C: Derivable Traits](#appendix-c-derivable-traits)
  - [Debug for Programmer Output](#debug-for-programmer-output)
  - [PartialEq and Eq for Equality Comparisons](#partialeq-and-eq-for-equality-comparisons)
  - [PartialOrd and Ord for Ordering Comparisons](#partialord-and-ord-for-ordering-comparisons)
  - [Clone and Copy for Duplicating Values](#clone-and-copy-for-duplicating-values)
  - [Hash for Mapping a Value to a Value of Fixed Size](#hash-for-mapping-a-value-to-a-value-of-fixed-size)
  - [Default for Default Values](#default-for-default-values)

- [Appendix D: Useful Development Tools](#appendix-d-useful-development-tools)
  - [Automatic Formatting with rustfmt](#automatic-formatting-with-rustfmt)
  - [Fix Your Code with rustfix](#fix-your-code-with-rustfix)
  - [More Lints with Clippy](#more-lints-with-clippy)
  - [IDE Integration Using rust-analyzer](#ide-integration-using-rust-analyzer)


## Chapter 1: Getting Started

### Creating a Project with Cargo

- TOML - tom's obvious, minimal lang

### Building and Running a Cargo Project

- cargo new, cargo build, cargo run
- Cargo also provides a command called cargo check. 
- This command quickly checks your code to make sure it compiles 
- but doesn’t produce an executable
- Why would you not want an executable? Often, cargo check is much
- faster than cargo build because it skips the step of producing one
- https://doc.rust-lang.org/cargo

## Appendix A: Keywords 
### Keywords Currently in Use 
### Keywords Reserved for Future Use 
### Raw Identifiers 

## Appendix B: Operators and Symbols 
### Operators 
### Non-operator Symbols 

## Appendix C: Derivable Traits 
### Debug for Programmer Output 
### PartialEq and Eq for Equality Comparisons 
### PartialOrd and Ord for Ordering Comparisons 
### Clone and Copy for Duplicating Values 
### Hash for Mapping a Value to a Value of Fixed Size 
### Default for Default Values 

## Appendix D: Useful Development Tools 
### Automatic Formatting with rustfmt 
### Fix Your Code with rustfix 
### More Lints with Clippy 
### IDE Integration Using rust-analyzer 
