# 400 - Conclusion

Dependency Injection approach and IoC-container frameworks take place in JS. TS provides variability and ways for classical implementation in sense of the abstraction level and resolving instances using decorators. Despite TS options, there are still gaps in the Metadata Reflection API but those can be handled by corresponding polyfills. The problem with inaccessibility to TS interfaces at runtime is fixed by workarounds using Symbol and strings. Surely, the work on addressing these shortcomings will continue in the near future, and eventually, it will be fully implemented.

Let’s consider the strengths and weaknesses of the approach discussed in the article.

## Advantages.

- Provides simplicity and flexibility for the unit testing, which is achieved by the ability to create simple “plug-ins” for complex dependencies and test only the target functionality in specific tests.
- Reduces the dependencies between software units. That has a positive impact on the prospects of expanding and scaling the system.
- Gives additional options to provide configurability for the system.

## Disadvantages.

- Increases the complexity of the system structure by new files and separating program behavior from creating software components.
- Code reading and System debugging/tracing are complicated because of the errors that could not be detected at compile time but only at runtime.
- Reducing the ability to use IDE automation features for link search, typing, and more.
- Higher threshold for entry into the project development and support for system building principles.

Usage of the described approach can have a positive and negative impact on software development. Regardless of the principles, paradigms, and patterns of programming, it often depends on how we can apply ideas in concrete solution, and how often system requirements can change. Therefore, the experience, understanding, and perceptions of the strengths and weaknesses of the development team are important. It is clear that this principle is better suited to large systems, enabling them to be broken down into simpler subsystems with defined dependencies. This is confirmed by the popular opinion that Angular 2+ (the role of DI in which is difficult to overestimate) is more suitable for large systems. But still, in my opinion, other popular frameworks are also quite competitive in solving complex problems.

In addition, too much attention has been paid to using TypeScript. From my point of view, knowledge of it is necessary for modern web development because it is actively used with all of the popular JS frameworks not only Angular 2+, including server-side NodeJS.

At the same time, we can make simple implementations too complicated, so we should rely on our own experience and team level. In any case, you should be open to new approaches, follow trends, and broaden your knowledge and skills, and, of course, not just programming ones.
