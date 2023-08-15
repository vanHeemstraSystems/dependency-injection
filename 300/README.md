# 300 - Building Our Application

**Dependency Injection**

Let’s consider one of the options for implementing the IoC principle in details. We have two classes of ```Car``` and ```Engine```, and the first one has a dependency on the other.

```
class Car {
   constructor(model) {
       this._model = model;
       this.engine = new Engine();
   }
}

class Engine {
   constructor() {
       this._currentPower = 0;
       this._maxPower = 100;
   }

   set power(val) {
       if (val >= 0 && val < this._maxPower) {
           this._currentPower = val;
       } else {
           throw new Error(`Incorrect power value: ${val}. Should be between 0 and ${this._maxPower}`);
       }
   }
}


const car = new Car('Tesla');
```
car-di-0.js hosted at https://gist.github.com/ViktorKukurba/380769b2d8b45f5b261f12974f00493a/raw/fa987270f625a0f9c3d7b4acb17cee682e727b78/car-di-0.js

Our task is to get rid of the dependency of the ```Engine``` class inside the ```Car``` class. By dependency we mean the creation of an ```Engine``` instance inside the ```Car``` constructor. The ```Car``` property ```this.engine``` still must be an instance of ```Engine```.

So, in the next step, we will consider three options for solving this problem using DI:

## 100 - Constructor Injection. 

In this case, the dependency is passed as a parameter in the constructor method.

```
class Car {
   constructor(model, engine) {
       this._model = model;
       this.engine = engine;
   }
}
const car = new Car('Tesla',  new Engine());
```
car-di-ci.js hosted at https://gist.github.com/ViktorKukurba/821c4b74c9c3e6f8bfe18a475884635c#file-car-di-ci-js

Here, the context in which the client is created is responsible for the creation of the dependency instance. The advantage of this approach is that after creating an instance, all of its composite parts (dependencies) are defined to the client. However, there is no opportunity to change the value of dependency without creating special methods, and it is necessary to have references to instances of dependencies before the creation of a client.

## 200 - Setter Injection 

This requires to implement a setter that transfers dependency on the client that is used:

```
class Car {
   constructor(model) {
       this._model = model;
       this.engine = null;
   }

   set engine(val) {
       if (val instanceof Engine) {
           this.engine = val;
       } else {
           throw new Error(`${val} should be instance of Engine`);
       }
   }
}

const car = new Car('Tesla');
car.engine = new Engine();
```
car-di-si.js hosted at https://gist.github.com/ViktorKukurba/ddfdb583c54e84649912175ab30cfbdb#file-car-di-si-js

In this case, the situation is possible when the client instance is already in use and the dependency is not set yet; on the other hand, it is possible to create and use the client without dependency or to replace the dependency in the process of executing the code.

## 300 - Interface Injection

An Interface Injection requires the implementation of an interface which is a set of methods or setters that stores dependencies within the client. The outer scope or special injector uses this interface to communicate with the client by setting or replacing dependencies.

As JS does not support interfaces we will consider the TypeScript example. In case of pure JavaScript, this interface can be maintained at the level of the conventions between the engineers, or by the creation of the base class.

```
interface EngineSetter {
   setEngine(engine: Engine): void;
}

class Car implements EngineSetter {
   private model: string;
   private engine: Engine;
   constructor(model: string) {
       this.model = model;
   }

   public setEngine(val: Engine): void {
       this.engine = val;
   }
}

class Engine {
   private config: string;
   constructor(config: string) {
       this.config = config
   }
}

// Injector class
class EngineInjector {
    private clients: EngineSetter[] = [];
    public inject(client: EngineSetter): void {
        this.clients.push(client);
        client.setEngine(new Engine('default'));
    }
    public updateEngine(engine: Engine): void {
       this.clients.forEach(client => client.setEngine(engine));
    }
}

const teslaS1 = new Car('Tesla model s');
const teslaS2 = new Car('Tesla model s');
const teslaS3 = new Car('Tesla model s');

const injector = new EngineInjector();

injector.inject(teslaS1);
injector.inject(teslaS2);
injector.inject(teslaS3);

injector.updateEngine(new Engine('ultimate'));
```
car-di-ii.js hosted at https://gist.github.com/ViktorKukurba/92b4aaba997786058d6361748376f8f3#file-car-di-ii-ts

This option works well for the family of classes that may have the same dependency, which in certain situations needs to be updated in all the clients.

== WE ARE HERE ==
