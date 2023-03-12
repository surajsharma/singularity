![](../../../../../attachments/2023-03-11-15-14-25.png)



Microservices are independently releasable services that are modelled around a business domain.


They are a type of service-oriented architecture, albeit one that is opinionated about how service boundaries should be drawn.


They are technology agnostic, which is one of the advantages they offer.



Microservice architectures avoid the use of shared databases in most circumstances; instead, each microservice encapsulates its own database.



Microservices embrace the concept of information hiding, changes inside a microservice boundary (as shown in Figure 1-1) shouldn’t affect an upstream consumer, enabling independent releasability of functionality. Hiding of internal state in a microservice is analogous with the practice of encapsulation in object-oriented (OO) programming. Encapsulation of data in OO systems is an example of information hiding in action.



Independent deployability is the idea that we can make a change to a microservice, deploy it, and release that change to our users, without having to deploy any other services. 


This is a simple idea that is nonetheless complex in execution.

the sharing of databases, for example, is especially problematic.







Owning Their Own State
If one service wants to access data held by another service, it should go and ask that service for the data it needs. 

