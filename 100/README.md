# 100 - Introduction

A **Dependency** is an object or any software programming unit that is used by the client program or software unit. For example, the dependency is a service that returns data that must be represented in the client (web component), and so on. Those kinds of objects are often used in different places of the project.

**Dependency Injection (DI)** is one of the implementations of IoC based on the composition of dependencies in a client (dependent unit).

See also [Inversion-of-Control](https://github.com/vanHeemstraSystems/inversion-of-control).

**Dependency Inversion Principle (DIP)** is one of [SOLID](https://en.wikipedia.org/wiki/SOLID)’s principles, which satisfies the following:

- the upper levels modules do not depend on implementations of the lower levels ones. Modules should depend on abstractions;
- abstractions do not depend on the details, but the details depend on abstractions;

The **IoC-container** is the implementation of the described principles in the form of a framework, library or module that facilitates the writing of a code and takes care of dependency injection and class instantiation.

Let’s try to look into more details of these concepts including examples in JavaScript.
