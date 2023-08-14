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
