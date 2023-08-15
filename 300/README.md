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

## 100 - Constructor injection. 

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

== WE ARE HERE ==
