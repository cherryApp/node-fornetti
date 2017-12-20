// Függvények a javascript-ben.
// Három féle függvény deklaráció.

// 1. Névvel ellátott függvény.
function adder(a, b) {
    return a + b;
}

// Függvény kifejezés (funciton expression).
var multiplier = function(a, b) {
    return a * b;
};

// Függvény kifejezés névvel ellátott függvénnyel.
var multiplier = function multi(a, b) {
    return a * b;
};

// Függvény meghívása.
console.log( adder(4, 7) );

// Default parameter.
function adder( a = 4, b = 7 ) {
    return a + b;
}
console.log(adder(2, 2), adder(), adder(null, 5));

// Paraméter tömb.
function adder( a, ...params) {
    for (var k in params) {
        a += params[k];
    }
    return a;
}
console.log( adder(2), adder(2, 3, 4, 2, 3, 88));

// Arrow function.
var adder = (a, b) => {
    return a + b;
};
var multi = num => {
    return num * 5;
};

// Függvények mint osztály. (pszeudo-class)
// Új osztály definiálása.
var Employee = function(name) {
    // Public tulajdonságok, this kulcsszóval.
    this.name = name;
    this.greeting = () => {
        return `Hello, my name is ${this.name}!`;
    };

    this.setData = (key, value) => {
        data[key] = value;
    };

    this.getJSON = () => {
        return JSON.stringify(data);
    };

    // Privát tulajdonságok, var kucsszóval.
    var data = {};
};
var zsolti = new Employee("Kürti Zsolt");
zsolti.setData("salary", 5000000);
console.log( zsolti.greeting(), zsolti.data, zsolti.getJSON() );

// Class.
class EmployeeClass {
    constructor(name) {
        this.name = name;
        this.data = {};
    }

    greeting() {
        return `Hello, my name is ${this.name}!`;
    }

    setData(key, value) {
        this.data[key] = value;
    }

    getJSON() {
        return JSON.stringify(this.data);
    }
}
var zsolti = new EmployeeClass("Kürti Zsolt");
zsolti.setData("salary", 5000000);
console.log( zsolti.greeting(), zsolti.data, zsolti.getJSON() );

// Öröklődés függvények esetén.
var CEO = function(name) {
    Employee.call(this, name);

    this.fire = () => {
        return `${this.name} to be fired!`;
    };
};
var zsolti = new CEO("Kürti Zsolt");
zsolti.setData("salary", 5000000);
console.log( zsolti.greeting(), zsolti.data, zsolti.getJSON(), zsolti.fire("Péter") );

// Öröklődés class-ok esetén.
class CEOClass extends EmployeeClass{
    constructor(name) {
        super(name);
    }

    fire() {
        return `${this.name} to be fired!`;
    }
}
var zsolti = new CEOClass("Kürti Zsolt");
zsolti.setData("salary", 5000000);
console.log( zsolti.greeting(), zsolti.data, zsolti.getJSON(), zsolti.fire("Péter") );