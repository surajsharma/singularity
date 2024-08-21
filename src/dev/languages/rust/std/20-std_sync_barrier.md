```rust

/* This module provides a synchronization primitive that enables
multiple threads to synchronize the beginning of some
computation.*/

use std::sync::{Arc, Barrier};

/*The std::sync::Barrier module is used when you need several
threads to stop at a certain point and wait for each other to
continue. This is useful for synchronizing threads that need to
start a specific part of a computation simultaneously*/ 

use std::thread;

fn main() {
    let barrier = Arc::new(Barrier::new(2));
	/*creates a new barrier that will block 
	threads until exactly two threads have 
	called wait() and wraps the barrier in an 
	atomic reference-counted (Arc) container 
	to allow it to be safely shared between 
	threads*/
	
    let c = barrier.clone();
	
    let thread = thread::spawn(move || {
		/*thread::spawn function is used to create a
		new thread that moves a cloned handle (c) of 
		the barrier into it*/

        println!("Thread 1 before wait");
		
        c.wait();
		/* wait() method on the barrier blocks the calling thread until
		all threads have reached the barrier.*/

        println!("Thread 1 after wait");
    });

    println!("Main thread before wait");
    barrier.wait();

    println!("Main thread after wait");
    thread.join().unwrap();
}


/*Output: 

Main thread before wait
Thread 1 before wait
Main thread after wait
Thread 1 after wait

The sequence of print statements shows how threads synchronize at the barrier: 
both threads have to reach the wait() call and block until both have arrived, 
after which they are both released and execution resumes */

```
