var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/';

var _connection = null;

var open = function() {
    MongoClient.connect(dburl, function(err, db) {
        if (err) {
            condolr.log("DB connection failed");
            return;
        }
        _connection = db.db('meanhotel');
        console.log("DB connection open", db);
    });
};

var get = function() {
    return _connection;
};

module.exports = {
    open : open,
    get : get
};