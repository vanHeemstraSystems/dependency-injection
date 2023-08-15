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
