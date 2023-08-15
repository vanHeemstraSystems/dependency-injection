# 300 - IoC Container

As we could see in case of using DI approach, there is a need to create dependencies outside of the classes that use them. Unlike trivial examples in more complex projects, there is a need to do this centrally. That is the main purpose of IoC containers, which maps “interfaces” and their specific implementations.

One of the first implementations of DI with the IoC container in JavaScript appeared in Angular 1.x. Other popular frameworks (Aurelia, InversifyJS, Angular 2+) that implement IoC containers in JavaScript use TypeScript. This brings a good level of abstraction that is important for building good implementations of the IoC frameworks.

This paragraph could be divided into several articles to cover the details of the implementation and to bring light to the magic that takes place under the hood of the IoC container approach. However, the purpose of this article is the usage of IoC containers, not their implementation. Therefore, the main points will be rather superficial to indicate the way it works. At the first stage of dealing with this approach, this is quite enough for the effective use of such frameworks.

So, an interface, abstract class, and strict typing are used in the implementations of the IoC container. That helps to separate the abstraction and implementation layer. Although based on Angular 1.x, we can make sure that this is not critical, but for complex, projects with the large codebase, it greatly affects code quality and development performance.

Also, classical IoC implementations use decorators that provide a convenient interface for marking specific classes (‘@ injectable’) that can be used as dependencies. In client class, the dependencies are labeled (‘@ inject’) that are tokens and are created using the IoC container. Dependency specific implementation will be known at the time of execution (runtime) and will be passed to the instances of client classes that require its injection.

The decorator methods use the polyfill “reflection-metadata” that implements the [Metadata Reflection API](https://github.com/rbuckton/reflect-metadata). That covers one of the goals to save and retrieve metadata information about types. Methods ```Reflect.defineMetadata``` and ```Reflect.getOwnMetadata``` are used for that purpose. That makes possible getting information about dependencies during creating the instances and up to injecting (usually send to the constructor method).

To be able to use decorators and metadata in TS, the following options should be specified in the configuration file (tsconfig.json):

```
"emitDecoratorMetadata": true,
"experimentalDecorators": true
```

Let’s consider the trivial example of using the IoC container with InversifyJS framework. **NOTE**: The InversifyJS framework is no longer maintained. Instead use [TSyringe](https://github.com/microsoft/tsyringe), maintained by Microsoft.

First, describe the **abstraction** layer.

```
interface IConfiguration {
   model: string;
   color: string;
}

interface IVehicle {
   description: string;
}

const TYPES = {
   Configuration: Symbol.for('Configuration'),
   Vehicle: Symbol.for('Vehicle')
}
```
di-abstraction-layer.ts hosted at https://gist.github.com/ViktorKukurba/429d20447f776d6161208044e73e6cc4#file-di-abstraction-layer-ts

We’ve defined the interfaces which our program will depend on. Also, there should be no dependency on the specific implementation of these interfaces.

In the next step, consider the trivial **implementation** of the described abstractions.

```
@injectable()
class SConfiguration implements IConfiguration {
   model = 'Model S';
   color = 'white'
}

@injectable()
class XConfiguration implements IConfiguration {
   model = 'Model X';
   color = 'black'
}


@injectable()
class Car implements IVehicle {
   constructor(@inject(TYPES.Configuration) private configuration: IConfiguration) {}

   get description() {
       const c = this.configuration;
       return `Car: ${c.model}, ${c.color}.`;
   }
}
```
di-implementation-layer.ts hosted at https://gist.github.com/ViktorKukurba/d62e47df84a60de165ab63220f05dbd2#file-di-implementaion-layer-ts

So, here we have three classes decorated with ```@injectable()``` that allow us to link them to the abstract layer in the next step.

It is common to implement the mapping (**configuration**) in the separate program file.

```
container.bind<IConfiguration>(TYPES.Configuration).to(SConfiguration);
container.bind<IVehicle>(TYPES.Vehicle).to(Car);
```

You can also implement an interface in this configuration file for changing implementations in run-time, depending on build, environment settings, or other external factors. An alternative option will be to connect different configuration files — abstraction mapping to one implementation or another one based on the described conditions.

Let’s illustrate it with an example of dynamic dependency change (a function is implemented in a configuration file)

```
export function useXConfig() {
  container.unbind(TYPES.Configuration);
  container.bind<IConfiguration>(TYPES.Configuration).to(XConfiguration);
}
```

The main program code will not change.

```
export function main() {
  const myCar = container.get<IVehicle>(TYPES.Vehicle);
  console.log(`myCar: ${myCar.description}`);
}
```

In the current case, we will get

```
main(); // myCar: Model S white
```

But after executing the function ```useXConfig();``` that can be executed by specific properties of the environment, behavior, user location, build settings, etc., we get

```
main(); // carX: Model X black
```

The trivial example described above is intended to show a program code consisting of **abstraction**, **implementation**, **configuration**, and **main** program, which has no dependencies on implementations. Usually, most changes occur in the main program and implementations. The abstraction and configuration ensure the stable and correct operation of the system, that is constantly updated, expanded, tested and executed in different environments.
