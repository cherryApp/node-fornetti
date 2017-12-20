// Object: Az Objektum a js alapvető építőköve.
var car = {
    manufacturer: "Volvo", // key: value, kulcs: érték párok
    tpye: "XC60",
    motor: "diesel",
    price: 22000
};
car.owner = "Zsolti";
console.log(car.price, car.type, car.owner);

// For ciklus nem megy. Nem szám indexek és nincs length tulajdonsága.
for (var i = 0; i < car.length; i++) {
    console.log(car[i]);
}

// For ciklus az objektum kulcsain.
var keys = Object.keys(car);
console.log("A car objektum kulcsai: ", keys);
for (var i = 0; i < keys.length; i++) {
    console.log(car[keys[i]]);
}

// For..in ciklus használata. k = kulcs, működik tömbre is.
for (var k in car) {
    console.log(k+":", car[k]);
}

// Objektumok tömbje.
var inventory = [
    {
        name: "liszt",
        quantity: 3000,
        place: "Júlia"
    },
    {
        name: "kovász",
        quantity: 1000,
        place: "Júlia"
    },
    {
        name: "só",
        quantity: 4500,
        place: "Kecskemét"
    },
    {
        name: "sütőlapát",
        quantity: 100,
        place: "Júlia"
    }
];

// Rendezés.
function sorter(collection, key) {
    collection.sort( function(a, b) {
        switch(typeof a[key]) {
            case "string": 
                return a[key].localeCompare(b[key]);
                break;
            case "boolean": 
                if (a[key] != b[key]) {
                    return a[key] > b[key] ? 1 : -1;
                } else {
                    return 0;
                }
                break;
            case "number": 
                return a[key] - b[key];
                break;
            default: 
                return 0;
            }
    });
}
sorter(inventory, "name");
console.log(inventory);
sorter(inventory, "quantity");
console.log(inventory);
sorter(inventory, "place");
console.log(inventory);
