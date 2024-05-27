"Introduction" 26
    "Who Rust Is For" 26
        "Teams of Developers" 26
        "Students" 27
        "Companies" 27
        "Open Source Developers" 28
        "People Who Value Speed and Stability" 28
    "Who This Book Is For" 29
    "How to Use This Book" 29
    "Resources and How to Contribute to This Book" 31
"Chapter 1: Getting Started" 32
    "Installation" 32
        "Installing rustup on Linux or macOS" 33
        "Installing rustup on Windows" 34
        "Troubleshooting" 34
        "Updating and Uninstalling" 35
        "Local Documentation" 35
    "Hello, World!" 36
        "Creating a Project Directory" 36
        "Writing and Running a Rust Program" 37
        "Anatomy of a Rust Program" 38
        "Compiling and Running Are Separate Steps" 39
    "Hello, Cargo!" 40
        "Creating a Project with Cargo" 41
        "Building and Running a Cargo Project" 43
        "Building for Release" 45
        "Cargo as Convention" 46
    "Summary" 46
"Chapter 2: Programming a Guessing Game" 47
    "Setting Up a New Project" 47
    "Processing a Guess" 49
        "Storing Values with Variables" 50
        "Receiving User Input" 51
        "Handling Potential Failure with Result" 52
        "Printing Values with println! Placeholders" 54
        "Testing the First Part" 54
    "Generating a Secret Number" 55
        "Using a Crate to Get More Functionality" 55
        "Generating a Random Number" 59
    "Comparing the Guess to the Secret Number" 61
    "Allowing Multiple Guesses with Looping" 65
        "Quitting After a Correct Guess" 67
        "Handling Invalid Input" 67
    "Summary" 70
"Chapter 3: Common Programming Concepts" 72
    "Variables and Mutability" 73
        "Constants" 75
        "Shadowing" 76
    "Data Types" 78
        "Scalar Types" 79
        "Compound Types" 85
    "Functions" 89
        "Parameters" 91
        "Statements and Expressions" 92
        "Functions with Return Values" 95
    "Comments" 97
    "Control Flow" 98
        "if Expressions" 98
        "Repetition with Loops" 103
    "Summary" 110
"Chapter 4: Understanding Ownership" 111
    "What Is Ownership?" 111
        "Ownership Rules" 114
        "Variable Scope" 114
        "The String Type" 115
        "Memory and Allocation" 117
        "Ownership and Functions" 124
        "Return Values and Scope" 126
    "References and Borrowing" 127
        "Mutable References" 131
        "Dangling References" 134
        "The Rules of References" 136
    "The Slice Type" 136
        "String Slices" 139
        "Other Slices" 144
    "Summary" 145
"Chapter 5: Using Structs to Structure Related Data" 146
    "Defining and Instantiating Structs" 146
        "Using the Field Init Shorthand" 149
        "Creating Instances from Other Instances with Struct Update Syntax" 149
        "Using Tuple Structs Without Named Fields to Create Different Types" 151
        "Unit-Like Structs Without Any Fields" 152
    "An Example Program Using Structs" 155
        "Refactoring with Tuples" 156
        "Refactoring with Structs: Adding More Meaning" 157
        "Adding Useful Functionality with Derived Traits" 158
    "Method Syntax" 162
        "Defining Methods" 163
        "Methods with More Parameters" 166
        "Associated Functions" 168
        "Multiple impl Blocks" 169
    "Summary" 170
"Chapter 6: Enums and Pattern Matching" 171
    "Defining an Enum" 171
        "Enum Values" 172
        "The Option Enum and Its Advantages Over Null Values" 177
    "The match Control Flow Construct" 181
        "Patterns That Bind to Values" 183
        "Matching with Option<T>" 184
        "Matches Are Exhaustive" 186
        "Catch-All Patterns and the _ Placeholder" 187
    "Concise Control Flow with if let" 189
    "Summary" 191
"Chapter 7: Managing Growing Projects with Packages, Crates, and Modules" 192
    "Packages and Crates" 193
    "Defining Modules to Control Scope and Privacy" 198
    "Paths for Referring to an Item in the Module Tree" 200
        "Exposing Paths with the pub Keyword" 203
        "Starting Relative Paths with super" 206
        "Making Structs and Enums Public" 207
    "Bringing Paths into Scope with the use Keyword" 210
        "Creating Idiomatic use Paths" 212
        "Providing New Names with the as Keyword" 214
        "Re-exporting Names with pub use" 214
        "Using External Packages" 216
        "Using Nested Paths to Clean Up Large use Lists" 217
        "The Glob Operator" 218
    "Separating Modules into Different Files" 219
    "Summary" 221
"Chapter 8: Common Collections" 223
    "Storing Lists of Values with Vectors" 224
        "Creating a New Vector" 224
        "Updating a Vector" 225
        "Reading Elements of Vectors" 225
        "Iterating Over the Values in a Vector" 228
        "Using an Enum to Store Multiple Types" 229
        "Dropping a Vector Drops Its Elements" 230
    "Storing UTF-8 Encoded Text with Strings" 231
        "What Is a String?" 231
        "Creating a New String" 232
        "Updating a String" 233
        "Indexing into Strings" 236
        "Slicing Strings" 239
        "Methods for Iterating Over Strings" 240
        "Strings Are Not So Simple" 241
    "Storing Keys with Associated Values in Hash Maps" 241
        "Creating a New Hash Map" 242
        "Accessing Values in a Hash Map" 243
        "Hash Maps and Ownership" 244
        "Updating a Hash Map" 244
        "Hashing Functions" 247
    "Summary" 248
"Chapter 9: Error Handling" 249
    "Unrecoverable Errors with panic!" 250
    "Recoverable Errors with Result" 254
        "Matching on Different Errors" 256
        "Propagating Errors" 260
    "To panic! or Not to panic!" 268
        "Examples, Prototype Code, and Tests" 269
        "Cases in Which You Have More Information Than the Compiler" 269
        "Guidelines for Error Handling" 270
        "Creating Custom Types for Validation" 272
    "Summary" 275
"Chapter 10: Generic Types, Traits, and Lifetimes" 276
    "Removing Duplication by Extracting a Function" 277
    "Generic Data Types" 280
        "In Function Definitions" 281
        "In Struct Definitions" 284
        "In Enum Definitions" 286
        "In Method Definitions" 287
        "Performance of Code Using Generics" 290
    "Traits: Defining Shared Behavior" 291
        "Defining a Trait" 291
        "Implementing a Trait on a Type" 293
        "Default Implementations" 295
        "Traits as Parameters" 298
        "Returning Types That Implement Traits" 300
        "Using Trait Bounds to Conditionally Implement Methods" 302
    "Validating References with Lifetimes" 303
        "Preventing Dangling References with Lifetimes" 304
        "The Borrow Checker" 305
        "Generic Lifetimes in Functions" 307
        "Lifetime Annotation Syntax" 309
        "Lifetime Annotations in Function Signatures" 309
        "Thinking in Terms of Lifetimes" 313
        "Lifetime Annotations in Struct Definitions" 314
        "Lifetime Elision" 315
        "Lifetime Annotations in Method Definitions" 319
        "The Static Lifetime" 320
    "Generic Type Parameters, Trait Bounds, and Lifetimes Together" 320
    "Summary" 321
"Chapter 11: Writing Automated Tests" 323
    "How to Write Tests" 324
        "The Anatomy of a Test Function" 324
        "Checking Results with the assert! Macro" 329
        "Testing Equality with the assert_eq! and assert_ne! Macros" 333
        "Adding Custom Failure Messages" 336
        "Checking for Panics with should_panic" 338
        "Using Result<T, E> in Tests" 343
    "Controlling How Tests Are Run" 344
        "Running Tests in Parallel or Consecutively" 344
        "Showing Function Output" 345
        "Running a Subset of Tests by Name" 347
        "Ignoring Some Tests Unless Specifically Requested" 350
    "Test Organization" 351
        "Unit Tests" 352
        "Integration Tests" 354
    "Summary" 359
"Chapter 12: An I/O Project: Building a Command Line Program" 361
    "Accepting Command Line Arguments" 362
        "Reading the Argument Values" 363
        "Saving the Argument Values in Variables" 365
    "Reading a File" 366
    "Refactoring to Improve Modularity and Error Handling" 368
        "Separation of Concerns for Binary Projects" 369
        "Fixing the Error Handling" 374
        "Extracting Logic from main" 378
        "Splitting Code into a Library Crate" 382
    "Developing the Library’s Functionality with Test-Driven Development" 384
        "Writing a Failing Test" 385
        "Writing Code to Pass the Test" 388
    "Working with Environment Variables" 392
        "Writing a Failing Test for the Case-Insensitive Search Function" 392
        "Implementing the search_case_insensitive Function" 394
    "Writing Error Messages to Standard Error Instead of Standard Output" 399
        "Checking Where Errors Are Written" 399
        "Printing Errors to Standard Error" 400
    "Summary" 401
"Chapter 13: Functional Language Features: Iterators and Closures" 403
    "Closures: Anonymous Functions That Capture Their Environment" 404
        "Capturing the Environment with Closures" 404
        "Closure Type Inference and Annotation" 407
        "Capturing References or Moving Ownership" 409
        "Moving Captured Values Out of Closures and the Fn Traits" 412
    "Processing a Series of Items with Iterators" 418
        "The Iterator Trait and the next Method" 419
        "Methods That Consume the Iterator" 421
        "Methods That Produce Other Iterators" 421
        "Using Closures That Capture Their Environment" 423
    "Improving Our I/O Project" 425
        "Removing a clone Using an Iterator" 425
        "Making Code Clearer with Iterator Adapters" 429
        "Choosing Between Loops and Iterators" 431
    "Comparing Performance: Loops vs. Iterators" 431
    "Summary" 433
"Chapter 14: More About Cargo and Crates.io" 434
    "Customizing Builds with Release Profiles" 434
    "Publishing a Crate to Crates.io" 436
        "Making Useful Documentation Comments" 436
        "Exporting a Convenient Public API with pub use" 441
        "Setting Up a Crates.io Account" 446
        "Adding Metadata to a New Crate" 446
        "Publishing to Crates.io" 449
        "Publishing a New Version of an Existing Crate" 449
        "Deprecating Versions from Crates.io with cargo yank" 450
    "Cargo Workspaces" 450
        "Creating a Workspace" 451
        "Creating the Second Package in the Workspace" 452
    "Installing Binaries with cargo install" 458
    "Extending Cargo with Custom Commands" 459
    "Summary" 459
"Chapter 15: Smart Pointers" 461
    "Using Box<T> to Point to Data on the Heap" 462
        "Using Box<T> to Store Data on the Heap" 463
        "Enabling Recursive Types with Boxes" 464
    "Treating Smart Pointers Like Regular References with Deref" 470
        "Following the Pointer to the Value" 471
        "Using Box<T> Like a Reference" 472
        "Defining Our Own Smart Pointer" 472
        "Implementing the Deref Trait" 474
        "Implicit Deref Coercions with Functions and Methods" 475
        "How Deref Coercion Interacts with Mutability" 477
    "Running Code on Cleanup with the Drop Trait" 478
    "Rc<T>, the Reference Counted Smart Pointer" 483
        "Using Rc<T> to Share Data" 484
        "Cloning an Rc<T> Increases the Reference Count" 486
    "RefCell<T> and the Interior Mutability Pattern" 488
        "Enforcing Borrowing Rules at Runtime with RefCell<T>" 489
        "Interior Mutability: A Mutable Borrow to an Immutable Value" 490
        "Allowing Multiple Owners of Mutable Data with Rc<T> and RefCell<T>" 499
    "Reference Cycles Can Leak Memory" 501
        "Creating a Reference Cycle" 501
        "Preventing Reference Cycles Using Weak<T>" 505
    "Summary" 511
"Chapter 16: Fearless Concurrency" 513
    "Using Threads to Run Code Simultaneously" 514
        "Creating a New Thread with spawn" 515
        "Waiting for All Threads to Finish Using join Handles" 517
        "Using move Closures with Threads" 519
    "Using Message Passing to Transfer Data Between Threads" 523
        "Channels and Ownership Transference" 527
        "Sending Multiple Values and Seeing the Receiver Waiting" 529
        "Creating Multiple Producers by Cloning the Transmitter" 530
    "Shared-State Concurrency" 532
        "Using Mutexes to Allow Access to Data from One Thread at a Time" 532
        "Similarities Between RefCell<T>/Rc<T> and Mutex<T>/Arc<T>" 540
    "Extensible Concurrency with the Send and Sync Traits" 540
        "Allowing Transference of Ownership Between Threads with Send" 541
        "Allowing Access from Multiple Threads with Sync" 541
        "Implementing Send and Sync Manually Is Unsafe" 542
    "Summary" 542
"Chapter 17: Object-Oriented Programming Features" 544
    "Characteristics of Object-Oriented Languages" 545
        "Objects Contain Data and Behavior" 545
        "Encapsulation That Hides Implementation Details" 545
        "Inheritance as a Type System and as Code Sharing" 548
    "Using Trait Objects That Allow for Values of Different Types" 549
        "Defining a Trait for Common Behavior" 550
        "Implementing the Trait" 553
        "Trait Objects Perform Dynamic Dispatch" 557
    "Implementing an Object-Oriented Design Pattern" 557
        "Defining Post and Creating a New Instance in the Draft State" 559
        "Storing the Text of the Post Content" 561
        "Ensuring the Content of a Draft Post Is Empty" 561
        "Requesting a Review Changes the Post’s State" 562
        "Adding approve to Change the Behavior of content" 564
        "Trade-offs of the State Pattern" 568
    "Summary" 574
"Chapter 18: Patterns and Matching" 575
    "All the Places Patterns Can Be Used" 576
        "match Arms" 576
        "Conditional if let Expressions" 577
        "while let Conditional Loops" 579
        "for Loops" 579
        "let Statements" 580
        "Function Parameters" 582
    "Refutability: Whether a Pattern Might Fail to Match" 583
    "Pattern Syntax" 586
        "Matching Literals" 586
        "Matching Named Variables" 586
        "Multiple Patterns" 588
        "Matching Ranges of Values with ..=" 588
        "Destructuring to Break Apart Values" 589
        "Ignoring Values in a Pattern" 595
        "Extra Conditionals with Match Guards" 601
        "@ Bindings" 603
    "Summary" 605
"Chapter 19: Advanced Features" 606
    "Unsafe Rust" 607
        "Unsafe Superpowers" 607
        "Dereferencing a Raw Pointer" 609
        "Calling an Unsafe Function or Method" 611
        "Accessing or Modifying a Mutable Static Variable" 617
        "Implementing an Unsafe Trait" 619
        "Accessing Fields of a Union" 620
        "When to Use Unsafe Code" 620
    "Advanced Traits" 620
        "Associated Types" 620
        "Default Generic Type Parameters and Operator Overloading" 623
        "Disambiguating Between Methods with the Same Name" 626
        "Using Supertraits" 631
        "Using the Newtype Pattern to Implement External Traits" 633
    "Advanced Types" 635
        "Using the Newtype Pattern for Type Safety and Abstraction" 635
        "Creating Type Synonyms with Type Aliases" 636
        "The Never Type That Never Returns" 639
        "Dynamically Sized Types and the Sized Trait" 641
    "Advanced Functions and Closures" 643
        "Function Pointers" 643
        "Returning Closures" 646
    "Macros" 647
        "The Difference Between Macros and Functions" 647
        "Declarative Macros with macro_rules! for General Metaprogramming" 648
        "Procedural Macros for Generating Code from Attributes" 651
        "How to Write a Custom derive Macro" 652
        "Attribute-Like Macros" 659
        "Function-Like Macros" 660
    "Summary" 661
"Chapter 20: Final Project: Building a Multithreaded Web Server" 662
    "Building a Single-Threaded Web Server" 663
        "Listening to the TCP Connection" 664
        "Reading the Request" 667
        "A Closer Look at an HTTP Request" 669
        "Writing a Response" 670
        "Returning Real HTML" 672
        "Validating the Request and Selectively Responding" 674
        "A Touch of Refactoring" 676
    "Turning Our Single-Threaded Server into a Multithreaded Server" 678
        "Simulating a Slow Request" 678
        "Improving Throughput with a Thread Pool" 680
    "Graceful Shutdown and Cleanup" 701
        "Implementing the Drop Trait on ThreadPool" 702
        "Signaling to the Threads to Stop Listening for Jobs" 705
    "Summary" 710
"Appendix A: Keywords" 711
    "Keywords Currently in Use" 711
    "Keywords Reserved for Future Use" 713
    "Raw Identifiers" 714
"Appendix B: Operators and Symbols" 716
    "Operators" 716
    "Non-operator Symbols" 719
"Appendix C: Derivable Traits" 725
    "Debug for Programmer Output" 726
    "PartialEq and Eq for Equality Comparisons" 726
    "PartialOrd and Ord for Ordering Comparisons" 727
    "Clone and Copy for Duplicating Values" 728
    "Hash for Mapping a Value to a Value of Fixed Size" 729
    "Default for Default Values" 729
"Appendix D: Useful Development Tools" 731
    "Automatic Formatting with rustfmt" 731
    "Fix Your Code with rustfix" 732
    "More Lints with Clippy" 733
    "IDE Integration Using rust-analyzer" 734
"Appendix E: Editions" 736
"Index" 738