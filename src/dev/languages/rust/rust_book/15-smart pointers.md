- [Chapter 15: Smart Pointers](#chapter-15-smart-pointers)
  - [Using Box to Point to Data on the Heap](#using-box-to-point-to-data-on-the-heap)
    - [Using Box to Store Data on the Heap](#using-box-to-store-data-on-the-heap)
    - [Enabling Recursive Types with Boxes](#enabling-recursive-types-with-boxes)
  - [Treating Smart Pointers Like Regular References with Deref](#treating-smart-pointers-like-regular-references-with-deref)
    - [Following the Pointer to the Value](#following-the-pointer-to-the-value)
    - [Using Box Like a Reference](#using-box-like-a-reference)
    - [Defining Our Own Smart Pointer](#defining-our-own-smart-pointer)
    - [Implementing the Deref Trait](#implementing-the-deref-trait)
    - [Implicit Deref Coercions with Functions and Methods](#implicit-deref-coercions-with-functions-and-methods)
    - [How Deref Coercion Interacts with Mutability](#how-deref-coercion-interacts-with-mutability)
  - [Running Code on Cleanup with the Drop Trait](#running-code-on-cleanup-with-the-drop-trait)
  - [Rc, the Reference Counted Smart Pointer](#rc-the-reference-counted-smart-pointer)
    - [Using Rc to Share Data](#using-rc-to-share-data)
    - [Cloning an Rc Increases the Reference Count](#cloning-an-rc-increases-the-reference-count)
  - [RefCell and the Interior Mutability Pattern](#refcell-and-the-interior-mutability-pattern)
    - [Enforcing Borrowing Rules at Runtime with RefCell](#enforcing-borrowing-rules-at-runtime-with-refcell)
    - [Interior Mutability: A Mutable Borrow to an Immutable Value](#interior-mutability-a-mutable-borrow-to-an-immutable-value)
    - [Allowing Multiple Owners of Mutable Data with Rc and RefCell](#allowing-multiple-owners-of-mutable-data-with-rc-and-refcell)
  - [Reference Cycles Can Leak Memory](#reference-cycles-can-leak-memory)
    - [Creating a Reference Cycle](#creating-a-reference-cycle)
    - [Preventing Reference Cycles Using Weak](#preventing-reference-cycles-using-weak)



## Chapter 15: Smart Pointers 
### Using Box<T> to Point to Data on the Heap 
#### Using Box<T> to Store Data on the Heap 
#### Enabling Recursive Types with Boxes 
### Treating Smart Pointers Like Regular References with Deref 
#### Following the Pointer to the Value 
#### Using Box<T> Like a Reference 
#### Defining Our Own Smart Pointer 
#### Implementing the Deref Trait 
#### Implicit Deref Coercions with Functions and Methods 
#### How Deref Coercion Interacts with Mutability 
### Running Code on Cleanup with the Drop Trait 
### Rc<T>, the Reference Counted Smart Pointer 
#### Using Rc<T> to Share Data 
#### Cloning an Rc<T> Increases the Reference Count 
### RefCell<T> and the Interior Mutability Pattern 
#### Enforcing Borrowing Rules at Runtime with RefCell<T> 
#### Interior Mutability: A Mutable Borrow to an Immutable Value 
#### Allowing Multiple Owners of Mutable Data with Rc<T> and RefCell<T> 
### Reference Cycles Can Leak Memory 
#### Creating a Reference Cycle 
#### Preventing Reference Cycles Using Weak<T> 


