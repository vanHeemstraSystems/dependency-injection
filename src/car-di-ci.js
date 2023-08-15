class Car {
   constructor(model, engine) {
       this._model = model;
       this.engine = engine;
   }
}
const car = new Car('Tesla',  new Engine());
