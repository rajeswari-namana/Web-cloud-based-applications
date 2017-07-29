var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://Rajeswari:namana1309@ds057386.mlab.com:57386/aplwbdemo';


MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var myobj = [
        {Id: '4af31b30f964a520b3ea21e3', Name: 'Name-Gardians of galaxy'},
        {Id: '4b019e70f964a520ff4322e3', Name: 'Year-2014'},
        {Id: '4b944769f964a520a37234e3', Name: 'imdbID-tt2015381'},
        {Id: '4bbcc68fa0a0c9b696c61a0f', Name: 'Type-movie'},
        {Id: '55008ea0498ef17172c53198', Name: 'Poster-N/A'}
    ];
    db.collection("Movies").insertMany(myobj, function (err, res) {
        if (err) throw err;
        db.close();
    });
});

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.collection("Movies").find({}).toArray(function (err, result) {
        if (err) throw err;
        db.close();
        var fs = require('fs');
        var data = []
        for (i = 0; i < 10; i++) {
            var obj = {
                name: result[i].Name,
                id: result[i].Id

            }
            data.push(obj)
        }
        var newdata = [{
            "name": "Movie Details",
            "parent": "US",
            "children": data
        }
        ]
        fs.writeFile("Restaurants.json", JSON.stringify(newdata), function (err) {
                if (err) throw err;
            }
        );
    });
});

