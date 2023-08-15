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
