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
