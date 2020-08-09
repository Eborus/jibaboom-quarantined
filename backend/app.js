var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const database = require('./database');
const backend = require('./backend');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.json({
  message: 'Welcome to JiBaBoom - Quarantined :)',
  availableEndpoints: [
  'POST /basic/insert { "data": [ {key1: value1, key2: value2, ...} ] }',
  'POST /advance/insert { "data": [ {key1: value1, key2: value2, ...} ] }',
  'GET /basic/result?para1=value1&para2=value2',
  'GET /advance/result?para1=value1&para2=value2',
  ],
  });
 });

app.get('/reset', function (req, res) {
  database.resetTable(function (err, result) {
      if (err) {
        // return res.json({ error: 'Failed to reset table' });
        return next({ message: "Failed to reset table!", status: 400});
      } else {
        return res.json({ result: 'Success' });
      }
    });
 });

app.post('/basic/insert', function (req, res, next) {
  const { data } = req.body;
  database.insertPerformanceData(data, 'Basic', (error, result) => {
    if(error) {
      return next(error);
    }
    console.log(result);
    res.json({result: "Success"});
  });
});

app.post('/advance/insert', function (req, res, next) {
  const { data } = req.body;
  database.insertPerformanceData(data, 'Advanced', (error, result) => {
    if(error) {
      return next(error);
    }
    console.log(result);
    res.json({result: "Success"});
  });
});

app.get('/performance/data', function(req, res, next) {
  console.log(req.query)
  const { dataType, festivalId, startTime, endTime, page, pageSize} = req.query;
  database.getPerformanceDetails(dataType, festivalId, startTime, endTime, page, pageSize, (error, result) =>{
    if(error) {
      return next(error);
    }
    return res.json({result: result});
  })
});

app.get('/basic/result', function(req, res, next) {
  const { festivalId } = req.query;
  database.getPerformancesForComputation(festivalId, (error, result) => {
    if(error) {
      return next(error);
    }
    const { error: computationError, result: computationResult } = backend.compute(result)
    if (computationError) return next(computationError);
    for (let i = 0; i < computationResult.length; i++) {
      computationResult[i]['performanceId'] = parseInt(computationResult[i].performance_id);
      computationResult[i]['startTime'] = computationResult[i].starttime;
      computationResult[i]['endTime'] = computationResult[i].endtime;
      // delete computationResult[i]['id'];
      // delete computationResult[i]['data_type'];
      // delete computationResult[i]['performance_id'];
      // delete computationResult[i]['festival_id'];
      // delete computationResult[i]['performance'];
      // delete computationResult[i]['starttime'];
      // delete computationResult[i]['endtime'];
      // delete computationResult[i]['popularity'];
    }
    return res.json({result: computationResult});
  })
})

app.get('/advance/result', function(req, res, next) {
  const { festivalId } = req.query;
  database.getPerformancesForComputation(festivalId, (error, result) => {
    if(error) {
      return next(error);
    }
    const { error: computationError, result: computationResult } = backend.computePopularity(result)
    if (computationError) return next(computationError);
    for (let i = 0; i < computationResult.length; i++) {
      computationResult[i]['performanceId'] = parseInt(computationResult[i].performance_id);
      computationResult[i]['startTime'] = computationResult[i].starttime;
      computationResult[i]['endTime'] = computationResult[i].endtime;
      // delete computationResult[i]['id'];
      // delete computationResult[i]['data_type'];
      // delete computationResult[i]['performance_id'];
      // delete computationResult[i]['festival_id'];
      // delete computationResult[i]['performance'];
      // delete computationResult[i]['starttime'];
      // delete computationResult[i]['endtime'];
      // delete computationResult[i]['popularity'];
    }
    return res.json({result: computationResult})
  })
})

// // Test if api works
// app.get('/', (req, res, next) => {
//   next({ message: "error!", status: 500, code: 12345});
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
    code: err.code || 500,
  });
});

module.exports = app;
