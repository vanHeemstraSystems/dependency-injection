"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
require("reflect-metadata");
var tsyringe_1 = require("tsyringe");
var Bar_1 = require("./Bar");
var myBar = tsyringe_1.container.resolve(Bar_1.Bar);
// myBar.myFoo => An instance of Foo
console.log("myBar.myFoo: ", myBar.myFoo);
