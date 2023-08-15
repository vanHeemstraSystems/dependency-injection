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
