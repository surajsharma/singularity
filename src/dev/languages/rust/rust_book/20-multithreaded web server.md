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


