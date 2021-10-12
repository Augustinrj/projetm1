// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// const url = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"
// // Connect MongoDB at default port 27017.
// let mong = mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }, (err) => {
//     if (!err) {
//         console.log('MongoDB Connection Succeeded.')
//     } else {
//         console.log('Error in DB connection: ' + err)
//     }
// });

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'auguste',
  password : 'augustin06',
  database : 'e_tsena'
});
module.exports = connection;