- [Chapter 13: Functional Language Features: Iterators and Closures](#chapter-13-functional-language-features-iterators-and-closures)
  - [Closures: Anonymous Functions That Capture Their Environment](#closures-anonymous-functions-that-capture-their-environment)
    - [Capturing the Environment with Closures](#capturing-the-environment-with-closures)
    - [Closure Type Inference and Annotation](#closure-type-inference-and-annotation)
    - [Capturing References or Moving Ownership](#capturing-references-or-moving-ownership)
    - [Moving Captured Values Out of Closures and the Fn Traits](#moving-captured-values-out-of-closures-and-the-fn-traits)
  - [Processing a Series of Items with Iterators](#processing-a-series-of-items-with-iterators)
    - [The Iterator Trait and the next Method](#the-iterator-trait-and-the-next-method)
    - [Methods That Consume the Iterator](#methods-that-consume-the-iterator)
    - [Methods That Produce Other Iterators](#methods-that-produce-other-iterators)
    - [Using Closures That Capture Their Environment](#using-closures-that-capture-their-environment)
  - [Improving Our I/O Project](#improving-our-io-project)
    - [Removing a clone Using an Iterator](#removing-a-clone-using-an-iterator)
    - [Making Code Clearer with Iterator Adapters](#making-code-clearer-with-iterator-adapters)
    - [Choosing Between Loops and Iterators](#choosing-between-loops-and-iterators)
  - [Comparing Performance: Loops vs. Iterators](#comparing-performance-loops-vs-iterators)



## Chapter 13: Functional Language Features: Iterators and Closures 
### Closures: Anonymous Functions That Capture Their Environment 
#### Capturing the Environment with Closures 
#### Closure Type Inference and Annotation 
#### Capturing References or Moving Ownership 
#### Moving Captured Values Out of Closures and the Fn Traits 
### Processing a Series of Items with Iterators 
#### The Iterator Trait and the next Method 
#### Methods That Consume the Iterator 
#### Methods That Produce Other Iterators 
#### Using Closures That Capture Their Environment 
### Improving Our I/O Project 
#### Removing a clone Using an Iterator 
#### Making Code Clearer with Iterator Adapters 
#### Choosing Between Loops and Iterators 
### Comparing Performance: Loops vs. Iterators 


