All Programming Philosophies Are About State
2023-02-04 - (2 min read)
I recently realized that all the various programming philosophies are concerned with state, and can be boiled down into a simple statement about how to work with state.

Object-Oriented - Modifying a lot of state at once is hard to get correct; encapsulate subsets of state into separate objects and allow limited manipulation of the encapsulated sub-state via methods.

Functional - Modifying state is hard to get correct; keep it at the boundaries and keep logic pure so that it is easier to verify the logic is correct.

Declarative - Modifying state is hard to get correct; use a language to describe how state should be manipulated and allow the machine to determine the steps required.

Imperative - Modifying state is hard to get correct; minimize the number of conceptual layers between how the computer operates and how the code is written.

Monolith - Modifying state distributed among many services is hard to get correct; keep it centralized.

Service-Oriented-Architecture - Modifying all of the state in one service is hard to get correct; distribute it among multiple services.

MicroServices - Modifying any state in a service is hard to get correct; have many services that are primarily stateless.

Conclusion
What this shows is that every programming philosophy is about how to manage state, and each philosophy comes with trade-offs. What this means is that there is no "one true way" to deal with state, and that each programming philosophy is useful and important in the correct domain. It also shows how important minimizing state is.



https://www.worldofbs.com/minimize-state/