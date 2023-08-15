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
