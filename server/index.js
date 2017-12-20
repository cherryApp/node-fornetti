var http = require("http");
var fs = require("fs");
var port = 3456;

var html = fs.readFileSync("./index.html", "utf8");
var server = http.createServer( (req, res) => {
    switch(req.method.toLowerCase()) {
        case "get": sendGetResponse(res);
            break;
        case "post": sendPostResponse(req, res);
            break;
        default: sendGetResponse(res);
            break;
    }    
});

var sendGetResponse = (res) => {
    readJSON("./data/inventory.json", (data) => {
        res.end( html.replace("#content", data) );
    });
};

var sendPostResponse = (req, res) => {
    // Kérés feldolgozása.
    var postData = "";
    req.on("data", (chunk) => {
        postData += chunk;
    });
    req.on("end", () => {
        postData = decodeURI(postData);
        postData = postData.split("&");
        var row = "";
        var dataObject = {};
        for(var k in postData) {
            row = postData[k].split("=");
            dataObject[row[0]] = row[1];
        }
        
        // Új record mentése.
        readJSON("./data/inventory.json", (json) => {
            json = JSON.parse(json);
            json.push(dataObject);
            writeJSON("./data/inventory.json", JSON.stringify(json), (err) => {
                sendGetResponse(res);
            });
        });
    });
};

server.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server running in: ${port}`);
});

// Write json.
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

var writeJSON = (filePath, jsonData, callBack) => {
    fs.writeFile(
        filePath, 
        jsonData,
        "utf8",
        (err) => {
            if (err) {
                return console.error(err);
            }
            callBack();
        });
};

// writeJSON("./data/inventory.json", JSON.stringify(inventory, null, 4));

// File olvasása.
var readJSON = (filePath, callBack) => {
    fs.readFile(filePath, "utf8", (err, fileData) => {
        if (err) {
            return console.error(err);
        }
        callBack(fileData);
    });
};

// Szinkron olvasás.
var jsonData = fs.readFileSync("./data/inventory.json", "utf8");

// Teszt.