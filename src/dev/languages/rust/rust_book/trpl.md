# the rust programming lang

- [the rust programming lang](#the-rust-programming-lang)
  - [Chapter 1: Getting Started](#chapter-1-getting-started)
    - [Creating a Project with Cargo](#creating-a-project-with-cargo)
    - [Building and Running a Cargo Project](#building-and-running-a-cargo-project)
  - [Chapter 2: Programming a Guessing Game \[\[main\]\]](#chapter-2-programming-a-guessing-game-main)
    - [Setting Up a New Project](#setting-up-a-new-project)
    - [Processing a Guess](#processing-a-guess)
      - [Storing Values with Variables](#storing-values-with-variables)
      - [Receiving User Input](#receiving-user-input)
      - [Handling Potential Failure with Result](#handling-potential-failure-with-result)
      - [Printing Values with println! Placeholders](#printing-values-with-println-placeholders)
      - [Testing the First Part](#testing-the-first-part)
    - [Generating a Secret Number](#generating-a-secret-number)
      - [Using a Crate to Get More Functionality](#using-a-crate-to-get-more-functionality)
      - [Generating a Random Number](#generating-a-random-number)
    - [Comparing the Guess to the Secret Number](#comparing-the-guess-to-the-secret-number)
    - [Allowing Multiple Guesses with Looping](#allowing-multiple-guesses-with-looping)
      - [Quitting After a Correct Guess](#quitting-after-a-correct-guess)
      - [Handling Invalid Input](#handling-invalid-input)
  - [Chapter 3: Common Programming Concepts](#chapter-3-common-programming-concepts)
    - [Variables and Mutability](#variables-and-mutability)
      - [Constants](#constants)
      - [Shadowing](#shadowing)
    - [Data Types](#data-types)
      - [Scalar Types](#scalar-types)
      - [Compound Types](#compound-types)
    - [Functions](#functions)
      - [Parameters](#parameters)
      - [Statements and Expressions](#statements-and-expressions)
      - [Functions with Return Values](#functions-with-return-values)
    - [Comments](#comments)
    - [Control Flow](#control-flow)
      - [if Expressions](#if-expressions)
      - [Repetition with Loops](#repetition-with-loops)
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
  - [Chapter 5: Using Structs to Structure Related Data](#chapter-5-using-structs-to-structure-related-data)
    - [Defining and Instantiating Structs](#defining-and-instantiating-structs)
      - [Using the Field Init Shorthand](#using-the-field-init-shorthand)
      - [Creating Instances from Other Instances with Struct Update Syntax](#creating-instances-from-other-instances-with-struct-update-syntax)
      - [Using Tuple Structs Without Named Fields to Create Different Types](#using-tuple-structs-without-named-fields-to-create-different-types)
      - [Unit-Like Structs Without Any Fields](#unit-like-structs-without-any-fields)
    - [An Example Program Using Structs](#an-example-program-using-structs)
      - [Refactoring with Tuples](#refactoring-with-tuples)
      - [Refactoring with Structs: Adding More Meaning](#refactoring-with-structs-adding-more-meaning)
      - [Adding Useful Functionality with Derived Traits](#adding-useful-functionality-with-derived-traits)
    - [Method Syntax](#method-syntax)
      - [Defining Methods](#defining-methods)
      - [Methods with More Parameters](#methods-with-more-parameters)
      - [Associated Functions](#associated-functions)
      - [Multiple impl Blocks](#multiple-impl-blocks)
  - [Chapter 6: Enums and Pattern Matching](#chapter-6-enums-and-pattern-matching)
    - [Defining an Enum](#defining-an-enum)
      - [Enum Values](#enum-values)
      - [The Option Enum and Its Advantages Over Null Values](#the-option-enum-and-its-advantages-over-null-values)
    - [The match Control Flow Construct](#the-match-control-flow-construct)
      - [Patterns That Bind to Values](#patterns-that-bind-to-values)
      - [Matching with Option](#matching-with-option)
      - [Matches Are Exhaustive](#matches-are-exhaustive)
      - [Catch-All Patterns and the \_ Placeholder](#catch-all-patterns-and-the-_-placeholder)
    - [Concise Control Flow with if let](#concise-control-flow-with-if-let)
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
  - [Chapter 8: Common Collections](#chapter-8-common-collections)
    - [Storing Lists of Values with Vectors](#storing-lists-of-values-with-vectors)
      - [Creating a New Vector](#creating-a-new-vector)
      - [Updating a Vector](#updating-a-vector)
      - [Reading Elements of Vectors](#reading-elements-of-vectors)
      - [Iterating Over the Values in a Vector](#iterating-over-the-values-in-a-vector)
      - [Using an Enum to Store Multiple Types](#using-an-enum-to-store-multiple-types)
      - [Dropping a Vector Drops Its Elements](#dropping-a-vector-drops-its-elements)
    - [Storing UTF- Encoded Text with Strings](#storing-utf--encoded-text-with-strings)
      - [What Is a String?](#what-is-a-string)
      - [Creating a New String](#creating-a-new-string)
      - [Updating a String](#updating-a-string)
      - [Indexing into Strings](#indexing-into-strings)
      - [Slicing Strings](#slicing-strings)
      - [Methods for Iterating Over Strings](#methods-for-iterating-over-strings)
      - [Strings Are Not So Simple](#strings-are-not-so-simple)
    - [Storing Keys with Associated Values in Hash Maps](#storing-keys-with-associated-values-in-hash-maps)
      - [Creating a New Hash Map](#creating-a-new-hash-map)
      - [Accessing Values in a Hash Map](#accessing-values-in-a-hash-map)
      - [Hash Maps and Ownership](#hash-maps-and-ownership)
      - [Updating a Hash Map](#updating-a-hash-map)
      - [Hashing Functions](#hashing-functions)
  - [Chapter 9: Error Handling](#chapter-9-error-handling)
    - [Unrecoverable Errors with panic!](#unrecoverable-errors-with-panic)
    - [Recoverable Errors with Result](#recoverable-errors-with-result)
      - [Matching on Different Errors](#matching-on-different-errors)
      - [Propagating Errors](#propagating-errors)
    - [To panic! or Not to panic!](#to-panic-or-not-to-panic)
      - [Examples, Prototype Code, and Tests](#examples-prototype-code-and-tests)
      - [Cases in Which You Have More Information Than the Compiler](#cases-in-which-you-have-more-information-than-the-compiler)
      - [Guidelines for Error Handling](#guidelines-for-error-handling)
      - [Creating Custom Types for Validation](#creating-custom-types-for-validation)
  - [Chapter 10: Generic Types, Traits, and Lifetimes](#chapter-10-generic-types-traits-and-lifetimes)
    - [Removing Duplication by Extracting a Function](#removing-duplication-by-extracting-a-function)
    - [Generic Data Types](#generic-data-types)
      - [In Function Definitions](#in-function-definitions)
      - [In Struct Definitions](#in-struct-definitions)
      - [In Enum Definitions](#in-enum-definitions)
      - [In Method Definitions](#in-method-definitions)
      - [Performance of Code Using Generics](#performance-of-code-using-generics)
    - [Traits: Defining Shared Behavior](#traits-defining-shared-behavior)
      - [Defining a Trait](#defining-a-trait)
      - [Implementing a Trait on a Type](#implementing-a-trait-on-a-type)
      - [Default Implementations](#default-implementations)
      - [Traits as Parameters](#traits-as-parameters)
      - [Returning Types That Implement Traits](#returning-types-that-implement-traits)
      - [Using Trait Bounds to Conditionally Implement Methods](#using-trait-bounds-to-conditionally-implement-methods)
    - [Validating References with Lifetimes](#validating-references-with-lifetimes)
      - [Preventing Dangling References with Lifetimes](#preventing-dangling-references-with-lifetimes)
      - [The Borrow Checker](#the-borrow-checker)
      - [Generic Lifetimes in Functions](#generic-lifetimes-in-functions)
      - [Lifetime Annotation Syntax](#lifetime-annotation-syntax)
      - [Lifetime Annotations in Function Signatures](#lifetime-annotations-in-function-signatures)
      - [Thinking in Terms of Lifetimes](#thinking-in-terms-of-lifetimes)
      - [Lifetime Annotations in Struct Definitions](#lifetime-annotations-in-struct-definitions)
      - [Lifetime Elision](#lifetime-elision)
      - [Lifetime Annotations in Method Definitions](#lifetime-annotations-in-method-definitions)
      - [The Static Lifetime](#the-static-lifetime)
    - [Generic Type Parameters, Trait Bounds, and Lifetimes Together](#generic-type-parameters-trait-bounds-and-lifetimes-together)
  - [Chapter 11: Writing Automated Tests](#chapter-11-writing-automated-tests)
    - [How to Write Tests](#how-to-write-tests)
      - [The Anatomy of a Test Function](#the-anatomy-of-a-test-function)
      - [Checking Results with the assert! Macro](#checking-results-with-the-assert-macro)
      - [Testing Equality with the assert\_eq! and assert\_ne! Macros](#testing-equality-with-the-assert_eq-and-assert_ne-macros)
      - [Adding Custom Failure Messages](#adding-custom-failure-messages)
      - [Checking for Panics with should\_panic](#checking-for-panics-with-should_panic)
      - [Using Result\<T, E\> in Tests](#using-resultt-e-in-tests)
    - [Controlling How Tests Are Run](#controlling-how-tests-are-run)
      - [Running Tests in Parallel or Consecutively](#running-tests-in-parallel-or-consecutively)
      - [Showing Function Output](#showing-function-output)
      - [Running a Subset of Tests by Name](#running-a-subset-of-tests-by-name)
      - [Ignoring Some Tests Unless Specifically Requested](#ignoring-some-tests-unless-specifically-requested)
    - [Test Organization](#test-organization)
      - [Unit Tests](#unit-tests)
      - [Integration Tests](#integration-tests)
  - [Chapter 12: An I/O Project: Building a Command Line Program](#chapter-12-an-io-project-building-a-command-line-program)
    - [Accepting Command Line Arguments](#accepting-command-line-arguments)
      - [Reading the Argument Values](#reading-the-argument-values)
      - [Saving the Argument Values in Variables](#saving-the-argument-values-in-variables)
    - [Reading a File](#reading-a-file)
    - [Refactoring to Improve Modularity and Error Handling](#refactoring-to-improve-modularity-and-error-handling)
      - [Separation of Concerns for Binary Projects](#separation-of-concerns-for-binary-projects)
      - [Fixing the Error Handling](#fixing-the-error-handling)
      - [Extracting Logic from main](#extracting-logic-from-main)
      - [Splitting Code into a Library Crate](#splitting-code-into-a-library-crate)
    - [Developing the Library’s Functionality with Test-Driven Development](#developing-the-librarys-functionality-with-test-driven-development)
      - [Writing a Failing Test](#writing-a-failing-test)
      - [Writing Code to Pass the Test](#writing-code-to-pass-the-test)
    - [Working with Environment Variables](#working-with-environment-variables)
      - [Writing a Failing Test for the Case-Insensitive Search Function](#writing-a-failing-test-for-the-case-insensitive-search-function)
      - [Implementing the search\_case\_insensitive Function](#implementing-the-search_case_insensitive-function)
    - [Writing Error Messages to Standard Error Instead of Standard Output](#writing-error-messages-to-standard-error-instead-of-standard-output)
      - [Checking Where Errors Are Written](#checking-where-errors-are-written)
      - [Printing Errors to Standard Error](#printing-errors-to-standard-error)
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
  - [Chapter 14: More About Cargo and Crates.io](#chapter-14-more-about-cargo-and-cratesio)
    - [Customizing Builds with Release Profiles](#customizing-builds-with-release-profiles)
    - [Publishing a Crate to Crates.io](#publishing-a-crate-to-cratesio)
      - [Making Useful Documentation Comments](#making-useful-documentation-comments)
      - [Exporting a Convenient Public API with pub use](#exporting-a-convenient-public-api-with-pub-use)
      - [Setting Up a Crates.io Account](#setting-up-a-cratesio-account)
      - [Adding Metadata to a New Crate](#adding-metadata-to-a-new-crate)
      - [Publishing to Crates.io](#publishing-to-cratesio)
      - [Publishing a New Version of an Existing Crate](#publishing-a-new-version-of-an-existing-crate)
      - [Deprecating Versions from Crates.io with cargo yank](#deprecating-versions-from-cratesio-with-cargo-yank)
    - [Cargo Workspaces](#cargo-workspaces)
      - [Creating a Workspace](#creating-a-workspace)
      - [Creating the Second Package in the Workspace](#creating-the-second-package-in-the-workspace)
    - [Installing Binaries with cargo install](#installing-binaries-with-cargo-install)
    - [Extending Cargo with Custom Commands](#extending-cargo-with-custom-commands)
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
  - [Chapter 16: Fearless Concurrency](#chapter-16-fearless-concurrency)
    - [Using Threads to Run Code Simultaneously](#using-threads-to-run-code-simultaneously)
      - [Creating a New Thread with spawn](#creating-a-new-thread-with-spawn)
      - [Waiting for All Threads to Finish Using join Handles](#waiting-for-all-threads-to-finish-using-join-handles)
      - [Using move Closures with Threads](#using-move-closures-with-threads)
    - [Using Message Passing to Transfer Data Between Threads](#using-message-passing-to-transfer-data-between-threads)
      - [Channels and Ownership Transference](#channels-and-ownership-transference)
      - [Sending Multiple Values and Seeing the Receiver Waiting](#sending-multiple-values-and-seeing-the-receiver-waiting)
      - [Creating Multiple Producers by Cloning the Transmitter](#creating-multiple-producers-by-cloning-the-transmitter)
    - [Shared-State Concurrency](#shared-state-concurrency)
      - [Using Mutexes to Allow Access to Data from One Thread at a Time](#using-mutexes-to-allow-access-to-data-from-one-thread-at-a-time)
      - [Similarities Between RefCell/Rc and Mutex/Arc](#similarities-between-refcellrc-and-mutexarc)
    - [Extensible Concurrency with the Send and Sync Traits](#extensible-concurrency-with-the-send-and-sync-traits)
      - [Allowing Transference of Ownership Between Threads with Send](#allowing-transference-of-ownership-between-threads-with-send)
      - [Allowing Access from Multiple Threads with Sync](#allowing-access-from-multiple-threads-with-sync)
      - [Implementing Send and Sync Manually Is Unsafe](#implementing-send-and-sync-manually-is-unsafe)
  - [Chapter 17: Object-Oriented Programming Features](#chapter-17-object-oriented-programming-features)
    - [Characteristics of Object-Oriented Languages](#characteristics-of-object-oriented-languages)
      - [Objects Contain Data and Behavior](#objects-contain-data-and-behavior)
      - [Encapsulation That Hides Implementation Details](#encapsulation-that-hides-implementation-details)
      - [Inheritance as a Type System and as Code Sharing](#inheritance-as-a-type-system-and-as-code-sharing)
    - [Using Trait Objects That Allow for Values of Different Types](#using-trait-objects-that-allow-for-values-of-different-types)
      - [Defining a Trait for Common Behavior](#defining-a-trait-for-common-behavior)
      - [Implementing the Trait](#implementing-the-trait)
      - [Trait Objects Perform Dynamic Dispatch](#trait-objects-perform-dynamic-dispatch)
    - [Implementing an Object-Oriented Design Pattern](#implementing-an-object-oriented-design-pattern)
      - [Defining Post and Creating a New Instance in the Draft State](#defining-post-and-creating-a-new-instance-in-the-draft-state)
      - [Storing the Text of the Post Content](#storing-the-text-of-the-post-content)
      - [Ensuring the Content of a Draft Post Is Empty](#ensuring-the-content-of-a-draft-post-is-empty)
      - [Requesting a Review Changes the Post’s State](#requesting-a-review-changes-the-posts-state)
      - [Adding approve to Change the Behavior of content](#adding-approve-to-change-the-behavior-of-content)
      - [Trade-offs of the State Pattern](#trade-offs-of-the-state-pattern)
  - [Chapter 18: Patterns and Matching](#chapter-18-patterns-and-matching)
    - [All the Places Patterns Can Be Used](#all-the-places-patterns-can-be-used)
      - [match Arms](#match-arms)
      - [Conditional if let Expressions](#conditional-if-let-expressions)
      - [while let Conditional Loops](#while-let-conditional-loops)
      - [for Loops](#for-loops)
      - [let Statements](#let-statements)
      - [Function Parameters](#function-parameters)
    - [Refutability: Whether a Pattern Might Fail to Match](#refutability-whether-a-pattern-might-fail-to-match)
    - [Pattern Syntax](#pattern-syntax)
      - [Matching Literals](#matching-literals)
      - [Matching Named Variables](#matching-named-variables)
      - [Multiple Patterns](#multiple-patterns)
      - [Matching Ranges of Values with ..=](#matching-ranges-of-values-with-)
      - [Destructuring to Break Apart Values](#destructuring-to-break-apart-values)
      - [Ignoring Values in a Pattern](#ignoring-values-in-a-pattern)
      - [Extra Conditionals with Match Guards](#extra-conditionals-with-match-guards)
      - [@ Bindings](#-bindings)
  - [Chapter 19: Advanced Features](#chapter-19-advanced-features)
    - [Unsafe Rust](#unsafe-rust)
      - [Unsafe Superpowers](#unsafe-superpowers)
      - [Dereferencing a Raw Pointer](#dereferencing-a-raw-pointer)
      - [Calling an Unsafe Function or Method](#calling-an-unsafe-function-or-method)
      - [Accessing or Modifying a Mutable Static Variable](#accessing-or-modifying-a-mutable-static-variable)
      - [Implementing an Unsafe Trait](#implementing-an-unsafe-trait)
      - [Accessing Fields of a Union](#accessing-fields-of-a-union)
      - [When to Use Unsafe Code](#when-to-use-unsafe-code)
    - [Advanced Traits](#advanced-traits)
      - [Associated Types](#associated-types)
      - [Default Generic Type Parameters and Operator Overloading](#default-generic-type-parameters-and-operator-overloading)
      - [Disambiguating Between Methods with the Same Name](#disambiguating-between-methods-with-the-same-name)
      - [Using Supertraits](#using-supertraits)
      - [Using the Newtype Pattern to Implement External Traits](#using-the-newtype-pattern-to-implement-external-traits)
    - [Advanced Types](#advanced-types)
      - [Using the Newtype Pattern for Type Safety and Abstraction](#using-the-newtype-pattern-for-type-safety-and-abstraction)
      - [Creating Type Synonyms with Type Aliases](#creating-type-synonyms-with-type-aliases)
      - [The Never Type That Never Returns](#the-never-type-that-never-returns)
      - [Dynamically Sized Types and the Sized Trait](#dynamically-sized-types-and-the-sized-trait)
    - [Advanced Functions and Closures](#advanced-functions-and-closures)
      - [Function Pointers](#function-pointers)
      - [Returning Closures](#returning-closures)
    - [Macros](#macros)
      - [The Difference Between Macros and Functions](#the-difference-between-macros-and-functions)
      - [Declarative Macros with macro\_rules! for General Metaprogramming](#declarative-macros-with-macro_rules-for-general-metaprogramming)
      - [Procedural Macros for Generating Code from Attributes](#procedural-macros-for-generating-code-from-attributes)
      - [How to Write a Custom derive Macro](#how-to-write-a-custom-derive-macro)
      - [Attribute-Like Macros](#attribute-like-macros)
      - [Function-Like Macros](#function-like-macros)
  - [Chapter 20: Final Project: Building a Multithreaded Web Server](#chapter-20-final-project-building-a-multithreaded-web-server)
    - [Building a Single-Threaded Web Server](#building-a-single-threaded-web-server)
      - [Listening to the TCP Connection](#listening-to-the-tcp-connection)
      - [Reading the Request](#reading-the-request)
      - [A Closer Look at an HTTP Request](#a-closer-look-at-an-http-request)
      - [Writing a Response](#writing-a-response)
      - [Returning Real HTML](#returning-real-html)
      - [Validating the Request and Selectively Responding](#validating-the-request-and-selectively-responding)
      - [A Touch of Refactoring](#a-touch-of-refactoring)
    - [Turning Our Single-Threaded Server into a Multithreaded Server](#turning-our-single-threaded-server-into-a-multithreaded-server)
      - [Simulating a Slow Request](#simulating-a-slow-request)
      - [Improving Throughput with a Thread Pool](#improving-throughput-with-a-thread-pool)
    - [Graceful Shutdown and Cleanup](#graceful-shutdown-and-cleanup)
      - [Implementing the Drop Trait on ThreadPool](#implementing-the-drop-trait-on-threadpool)
      - [Signaling to the Threads to Stop Listening for Jobs](#signaling-to-the-threads-to-stop-listening-for-jobs)
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

## Chapter 2: Programming a Guessing Game [[main]]
###  Setting Up a New Project
###  Processing a Guess 
#### Storing Values with Variables 
#### Receiving User Input
#### Handling Potential Failure with Result 
#### Printing Values with println! Placeholders 
#### Testing the First Part
### Generating a Secret Number
#### Using a Crate to Get More Functionality
#### Generating a Random Number
### Comparing the Guess to the Secret Number 
### Allowing Multiple Guesses with Looping 
#### Quitting After a Correct Guess 
#### Handling Invalid Input

## Chapter 3: Common Programming Concepts 
### Variables and Mutability 
#### Constants 
#### Shadowing 
### Data Types 
#### Scalar Types 
#### Compound Types 
### Functions 
#### Parameters 
#### Statements and Expressions 
#### Functions with Return Values 
### Comments 
### Control Flow 
#### if Expressions 
#### Repetition with Loops 

## Chapter 4: Understanding Ownership 
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

## Chapter 5: Using Structs to Structure Related Data 
### Defining and Instantiating Structs 
#### Using the Field Init Shorthand 
#### Creating Instances from Other Instances with Struct Update Syntax 
#### Using Tuple Structs Without Named Fields to Create Different Types 
#### Unit-Like Structs Without Any Fields 
### An Example Program Using Structs 
#### Refactoring with Tuples 
#### Refactoring with Structs: Adding More Meaning 
#### Adding Useful Functionality with Derived Traits 
### Method Syntax 
#### Defining Methods 
#### Methods with More Parameters 
#### Associated Functions 
#### Multiple impl Blocks 


## Chapter 6: Enums and Pattern Matching 
### Defining an Enum 
#### Enum Values 
#### The Option Enum and Its Advantages Over Null Values 
### The match Control Flow Construct 
#### Patterns That Bind to Values 
#### Matching with Option<T> 
#### Matches Are Exhaustive 
#### Catch-All Patterns and the _ Placeholder 
### Concise Control Flow with if let 

## Chapter 7: Managing Growing Projects with Packages, Crates, and Modules 
### Packages and Crates 
### Defining Modules to Control Scope and Privacy 
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

## Chapter 8: Common Collections 
### Storing Lists of Values with Vectors 
#### Creating a New Vector 
#### Updating a Vector 
#### Reading Elements of Vectors 
#### Iterating Over the Values in a Vector 
#### Using an Enum to Store Multiple Types 
#### Dropping a Vector Drops Its Elements 
### Storing UTF- Encoded Text with Strings 
#### What Is a String? 
#### Creating a New String 
#### Updating a String 
#### Indexing into Strings 
#### Slicing Strings 
#### Methods for Iterating Over Strings 
#### Strings Are Not So Simple 
### Storing Keys with Associated Values in Hash Maps 
#### Creating a New Hash Map 
#### Accessing Values in a Hash Map 
#### Hash Maps and Ownership 
#### Updating a Hash Map 
#### Hashing Functions 

## Chapter 9: Error Handling 
### Unrecoverable Errors with panic! 
### Recoverable Errors with Result 
#### Matching on Different Errors 
#### Propagating Errors 
### To panic! or Not to panic! 
#### Examples, Prototype Code, and Tests 
#### Cases in Which You Have More Information Than the Compiler 
#### Guidelines for Error Handling 
#### Creating Custom Types for Validation 

## Chapter 10: Generic Types, Traits, and Lifetimes 
### Removing Duplication by Extracting a Function 
### Generic Data Types 
#### In Function Definitions 
#### In Struct Definitions 
#### In Enum Definitions 
#### In Method Definitions 
#### Performance of Code Using Generics 
### Traits: Defining Shared Behavior 
#### Defining a Trait 
#### Implementing a Trait on a Type 
#### Default Implementations 
#### Traits as Parameters 
#### Returning Types That Implement Traits 
#### Using Trait Bounds to Conditionally Implement Methods 
### Validating References with Lifetimes 
#### Preventing Dangling References with Lifetimes 
#### The Borrow Checker 
#### Generic Lifetimes in Functions 
#### Lifetime Annotation Syntax 
#### Lifetime Annotations in Function Signatures 
#### Thinking in Terms of Lifetimes 
#### Lifetime Annotations in Struct Definitions 
#### Lifetime Elision 
#### Lifetime Annotations in Method Definitions 
#### The Static Lifetime 
### Generic Type Parameters, Trait Bounds, and Lifetimes Together 

## Chapter 11: Writing Automated Tests 
### How to Write Tests 
#### The Anatomy of a Test Function 
#### Checking Results with the assert! Macro 
#### Testing Equality with the assert_eq! and assert_ne! Macros 
#### Adding Custom Failure Messages 
#### Checking for Panics with should_panic 
#### Using Result<T, E> in Tests 
### Controlling How Tests Are Run 
#### Running Tests in Parallel or Consecutively 
#### Showing Function Output 
#### Running a Subset of Tests by Name 
#### Ignoring Some Tests Unless Specifically Requested 
### Test Organization 
#### Unit Tests 
#### Integration Tests 

## Chapter 12: An I/O Project: Building a Command Line Program 
### Accepting Command Line Arguments 
#### Reading the Argument Values 
#### Saving the Argument Values in Variables 
### Reading a File 
### Refactoring to Improve Modularity and Error Handling 
#### Separation of Concerns for Binary Projects 
#### Fixing the Error Handling 
#### Extracting Logic from main 
#### Splitting Code into a Library Crate 
### Developing the Library’s Functionality with Test-Driven Development 
#### Writing a Failing Test 
#### Writing Code to Pass the Test 
### Working with Environment Variables 
#### Writing a Failing Test for the Case-Insensitive Search Function 
#### Implementing the search_case_insensitive Function 
### Writing Error Messages to Standard Error Instead of Standard Output 
#### Checking Where Errors Are Written 
#### Printing Errors to Standard Error 

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

## Chapter 14: More About Cargo and Crates.io 
### Customizing Builds with Release Profiles 
### Publishing a Crate to Crates.io 
#### Making Useful Documentation Comments 
#### Exporting a Convenient Public API with pub use 
#### Setting Up a Crates.io Account 
#### Adding Metadata to a New Crate 
#### Publishing to Crates.io 
#### Publishing a New Version of an Existing Crate 
#### Deprecating Versions from Crates.io with cargo yank 
### Cargo Workspaces 
#### Creating a Workspace 
#### Creating the Second Package in the Workspace 
### Installing Binaries with cargo install 
### Extending Cargo with Custom Commands 


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

## Chapter 16: Fearless Concurrency 
### Using Threads to Run Code Simultaneously 
#### Creating a New Thread with spawn 
#### Waiting for All Threads to Finish Using join Handles 
#### Using move Closures with Threads 
### Using Message Passing to Transfer Data Between Threads 
#### Channels and Ownership Transference 
#### Sending Multiple Values and Seeing the Receiver Waiting 
#### Creating Multiple Producers by Cloning the Transmitter 
### Shared-State Concurrency 
#### Using Mutexes to Allow Access to Data from One Thread at a Time 
#### Similarities Between RefCell<T>/Rc<T> and Mutex<T>/Arc<T> 
### Extensible Concurrency with the Send and Sync Traits 
#### Allowing Transference of Ownership Between Threads with Send 
#### Allowing Access from Multiple Threads with Sync 
#### Implementing Send and Sync Manually Is Unsafe 

## Chapter 17: Object-Oriented Programming Features 
### Characteristics of Object-Oriented Languages 
#### Objects Contain Data and Behavior 
#### Encapsulation That Hides Implementation Details 
#### Inheritance as a Type System and as Code Sharing 
### Using Trait Objects That Allow for Values of Different Types 
#### Defining a Trait for Common Behavior 
#### Implementing the Trait 
#### Trait Objects Perform Dynamic Dispatch 
### Implementing an Object-Oriented Design Pattern 
#### Defining Post and Creating a New Instance in the Draft State 
#### Storing the Text of the Post Content 
#### Ensuring the Content of a Draft Post Is Empty 
#### Requesting a Review Changes the Post’s State 
#### Adding approve to Change the Behavior of content 
#### Trade-offs of the State Pattern 

## Chapter 18: Patterns and Matching 
### All the Places Patterns Can Be Used 
#### match Arms 
#### Conditional if let Expressions 
#### while let Conditional Loops 
#### for Loops 
#### let Statements 
#### Function Parameters 
### Refutability: Whether a Pattern Might Fail to Match 
### Pattern Syntax 
#### Matching Literals 
#### Matching Named Variables 
#### Multiple Patterns 
#### Matching Ranges of Values with ..= 
#### Destructuring to Break Apart Values 
#### Ignoring Values in a Pattern 
#### Extra Conditionals with Match Guards 
#### @ Bindings 

## Chapter 19: Advanced Features 
### Unsafe Rust 
#### Unsafe Superpowers 
#### Dereferencing a Raw Pointer 
#### Calling an Unsafe Function or Method 
#### Accessing or Modifying a Mutable Static Variable 
#### Implementing an Unsafe Trait 
#### Accessing Fields of a Union 
#### When to Use Unsafe Code 
### Advanced Traits 
#### Associated Types 
#### Default Generic Type Parameters and Operator Overloading 
#### Disambiguating Between Methods with the Same Name 
#### Using Supertraits 
#### Using the Newtype Pattern to Implement External Traits 
### Advanced Types 
#### Using the Newtype Pattern for Type Safety and Abstraction 
#### Creating Type Synonyms with Type Aliases 
#### The Never Type That Never Returns 
#### Dynamically Sized Types and the Sized Trait 
### Advanced Functions and Closures 
#### Function Pointers 
#### Returning Closures 
### Macros 
#### The Difference Between Macros and Functions 
#### Declarative Macros with macro_rules! for General Metaprogramming 
#### Procedural Macros for Generating Code from Attributes 
#### How to Write a Custom derive Macro 
#### Attribute-Like Macros 
#### Function-Like Macros 

## Chapter 20: Final Project: Building a Multithreaded Web Server 
### Building a Single-Threaded Web Server 
#### Listening to the TCP Connection 
#### Reading the Request 
#### A Closer Look at an HTTP Request 
#### Writing a Response 
#### Returning Real HTML 
#### Validating the Request and Selectively Responding 
#### A Touch of Refactoring 
### Turning Our Single-Threaded Server into a Multithreaded Server 
#### Simulating a Slow Request 
#### Improving Throughput with a Thread Pool 
### Graceful Shutdown and Cleanup 
#### Implementing the Drop Trait on ThreadPool 
#### Signaling to the Threads to Stop Listening for Jobs 

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

[//begin]: # Autogenerated link references for markdown compatibility
[main]: src/main main
[//end]: # Autogenerated link references

[//begin]: # "Autogenerated link references for markdown compatibility"
[main]: src/main "main"
[//end]: # "Autogenerated link references"