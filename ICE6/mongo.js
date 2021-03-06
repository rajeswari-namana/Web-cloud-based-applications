/**
 * Created by karthik on 7/14/17.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url = 'mongodb://Rajeswari:namana1309@ds057386.mlab.com:57386/aplwbdemo'//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function () {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('books').find().toArray(function (err, result) {
            if (err) {
                res.write("get Failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    // 2.Connect to MongoDB . Handle the error and write the logic for deleting the desired book

    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var id = req.params.toBeDeleted_id;
        db.collection("books").deleteOne({"_id": new ObjectID(id)},function (err, obj) {
            if (err) throw err;
            console.log("deleted a document in the books collection.");
            db.close();

        });

    });

});

app.get('/update/:s_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};
        var newData={};

        if(req.params.s_id){
            find._id = new ObjectID(req.params.s_id);
        }
        if(req.query.ISBN){
            newData.ISBN = req.query.ISBN;
        }
        if(req.query.bookName){
            newData.bookName = req.query.bookName;
        }

        if(req.query.authorName){
            newData.authorName = req.query.authorName;
        }

        db.collection('books').update(find,{'$set':newData},
            function(err,result){
                if(err)
                    throw err;
                else
                    res.send("Update success !");
            });
    });
});



var insertDocument = function (db, data, callback) {
    db.collection('books').insertOne(data, function (err, result) {
        if (err) {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the books collection.");
        callback();
    });
};

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});

