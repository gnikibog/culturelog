
var http = require("http"),
    express = require("express");

function parseClog(clog_raw) {
    //console.log(clog);
    var re = "\\n\\*\\s*(.*)"
    var names = ["By", "Type", "Genre", "Rating", "Experienced on"]//, "Thoughts"]
    for (var i in names) {
        re += "\\n[\\s\\*]*" + names[i] + ":\\s*(.*)";
    }
    items = [];
    clog_raw.replace(new RegExp(re, "g"), function() {
        items.push({
            name: arguments[1],
            author: arguments[2],
            category: arguments[3],
            "date-logged": arguments[6],
            rating: arguments[5]
        });
    });
    return items;
}

function getClog(callback) {
    var options = {
      host: "www.maxjacobson.net",
      port: 80,
      path: "/culturelog/text-example.txt"
    };
    var req = http.request(options, function(res) {
      res.on("data", function(chunk) {
        callback(chunk.toString());
      });
    });
    req.end();
}

var app = express.createServer();
app.configure(function() {
    /*app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));*/
});

app.get("/api/test", function(req, res) {
    console.log("testing");
    res.send("tested");
});

app.get("/api/items", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    getClog(function(clog_raw) {
        clog = parseClog(clog_raw);
        res.send(JSON.stringify(clog));
    });
});

app.listen(8087);
