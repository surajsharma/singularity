- [Chapter 7: Managing Growing Projects with Packages, Crates, and Modules](#chapter-7-managing-growing-projects-with-packages-crates-and-modules)
  - [Packages and Crates](#packages-and-crates)
  - [Defining Modules to Control Scope and Privacy](#defining-modules-to-control-scope-and-privacy)
  - [Paths for Referring to an Item in the Module Tree](#paths-for-referring-to-an-item-in-the-module-tree)
    - [Exposing Paths with the pub Keyword](#exposing-paths-with-the-pub-keyword)
    - [Starting Relative Paths with super](#starting-relative-paths-with-super)
    - [Making Structs and Enums Public](#making-structs-and-enums-public)
  - [Bringing Paths into Scope with the use Keyword](#bringing-paths-into-scope-with-the-use-keyword)
    - [Creating Idiomatic use Paths](#creating-idiomatic-use-paths)
    - [Providing New Names with the as Keyword](#providing-new-names-with-the-as-keyword)
    - [Re-exporting Names with pub use](#re-exporting-names-with-pub-use)
    - [Using External Packages](#using-external-packages)
    - [Using Nested Paths to Clean Up Large use Lists](#using-nested-paths-to-clean-up-large-use-lists)
    - [The Glob Operator](#the-glob-operator)
  - [Separating Modules into Different Files](#separating-modules-into-different-files)


## Chapter 7: Managing Growing Projects with Packages, Crates, and Modules 
### Packages and Crates 

```
package
  binary crate
    root module
      module
      module
      module
      ...
  library crate 
    root module
      module
      module
      module
      ...
```

### Defining Modules to Control Scope and Privacy

- Start from the crate root: When compiling a crate, the compiler first looks in the crate root file (usually `src/lib.rs` for a library crate or `src/main.rs` for a binary crate) for code to compile.
- Declaring modules: **In the crate root file, you can declare new modules**; say you declare a “garden” module with `mod garden`;. The compiler will look for the module’s code in these places:
  - Inline, within curly brackets that replace the semicolon following mod garden
  - In the file `src/garden.rs`
  - In the file `src/garden/mod.rs`

### Paths for Referring to an Item in the Module Tree 
#### Exposing Paths with the pub Keyword 
#### Starting Relative Paths with super 
#### Making Structs and Enums Public 
### Bringing Paths into Scope with the use Keyword 
#### Creating Idiomatic use Paths 
#### Providing New Names with the as Keyword 
#### Re-exporting Names with pub use 
#### Using External Packages 
#### Using Nested Paths to Clean Up Large use Lists 
#### The Glob Operator 
### Separating Modules into Different Files 


