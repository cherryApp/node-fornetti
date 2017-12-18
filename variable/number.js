// A típus neve: Number
// Operátorok.
var num = (2+3) * 4 / (2-1);
console.log(num);

// Tizedesek levágása. Maximális bitonságos Integer 2^53-1
num += 0.55;
console.log( (num*(-1)).toFixed(14), typeof num.toFixed() );
console.log(Number.MAX_SAFE_INTEGER);

// String átalakítása Number -é.
var str = "344.5";
console.log(parseInt(str), parseFloat(str));
str = "32 ember";
console.log(parseInt(str), parseFloat(str));
str = "a szám 44";
console.log(parseInt(str), parseFloat(str)); // NaN: not a number