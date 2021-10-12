var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var apiRouter = require('./routes/book');
var app = express();
app.use(logger('dev'));
const bodyparser = require("body-parser");
const cors = require("cors");
var corsOption = {
    origin : "http://localhost:4200"
}
app.use(cors(corsOption));
app.use(express.json({limit:"50mb"}));
app.use(bodyparser.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb",extended: true,parameterLimit:50000 }));
app.use(express.static(path.join(__dirname, '../Angular/dist/Angular')));
app.use('/', express.static(path.join(__dirname, '../Angular/dist/Angular')));

require("./routes/routes")(app);


// app.post("/api/photo",multipartMiddleware,(req,res)=>{
    
//     res.json({
//         'message':'File uploaded successfully '+req.file
//     });
// });

app.use('/api', apiRouter);

const db = require("./models");
// const bodyParser = require('body-parser');
db.sequelize.sync();
app.use('/api/images',express.static('./uploads/'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.status);
});


module.exports = app;