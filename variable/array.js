// A tömbök kollekciók, azaz több más primitív vagy kollekció található bennük.
var arr = [];

// Tömb típus ellenőrzése.
console.log( typeof arr, Array.isArray(arr), Array.isArray(4) );

// Tömb elemek módosítása. Lehetőleg kerüljük a lyukas tömböket.
arr[0] = 33;
arr[2] = 55;
console.log(arr);

// Tömb végének a módosítása.
arr = [2, 7, 5, 4, 11];
console.log( arr.pop(), arr ); // levesz egy elemet az eredeti tömbből
console.log( arr.push(7), arr ); // hozzáad egy elemet a tömb végén

// Tömb elejének a módosítása.
arr = [2, 7, 5, 4, 11];
console.log( arr.shift(), arr ); // levesz egy elemet az elejéről
console.log( arr.unshift(7), arr ); // hozzáad egy elemet az elejéhez

// Rendezés.
console.log(arr.sort());

arr.sort( function(a, b) {
    return parseInt(a) - parseInt(b);
    /*if (a > b) {
        return -1;
    } else if (b > a) {
        return 1;
    } else {
        return 0;
    }*/
});
console.log(arr);

arr = ["István", "Péter", "Ágota", "Örs", "Bence"];
arr.sort();
console.log(arr);
arr.sort( function(a, b) {
    return a.localeCompare(b);
});
console.log(arr);

// Többdimenziós tömb.
var epmployees = [
    ["Józsi", 45, "programmer", "j.cserko@gmail.com"],
    ["Norbi", 25, "programmer", "norbi@fornetti.com"],
    ["Igor", 32, "programmer", "igor@fornetti.com"]
];
console.log(epmployees[1][3]);

// Tömb szűrése.
var young = epmployees.filter( function(item) {
    return item[1] < 40;
});
console.log(young);

// Tömb elemek módosítása, Array map metódussal.
var mapped = epmployees.map( function(item) {
    item[3] = item[3].replace(/\.com/g, ".hu");
    return item;
});
console.log(mapped);

