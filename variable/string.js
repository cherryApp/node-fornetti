// Inicializálás.
var name = "Pisti";

// Nagybetűssé alakítás.
name = name.toUpperCase();
console.log(name);

// Kisbetűsség alakítás.
name = name.toLowerCase();
console.log(name);

// String vágása.
var log = "2017-12-18 22:44:22 System Failed or Started";
var errorString = log.slice(19);
console.log(errorString.trim()); // Whitespace karakterek levágása trim-el.
var timeStamp = log.slice(0, 19);
console.log(timeStamp); 

// String cseréje. Alapból az elsőt cseréli.
var newLog = log.replace("failed", "started");
console.log(newLog);
newLog = log.replace(/failed|started/gmi, "changed"); // összes cseréje
console.log(newLog);

// ES2015 új szabvány fejlesztései.
// Probléma: több soros string.
var longString = "Ez az első sor\n" +
                "Ez a második sor\n" + 
                "Ez a harmadik sor";
// Template literal.
longString = `első sor
második sor
harmadik sor`;
console.log(longString);

// Probléma: változók behelyettesítése.
// Régi módszer:
var date = "2017-12-18";
var message = "System ok";
var calc = function() {
    return 5 + 7;
};
log = date + " " + message;

// Template literal.
log = `${date}, message: ${message}, ${calc()}`;
console.log(log);

// Keresés.
var position = log.indexOf("message");
console.log(position, log.indexOf("Igor"));

