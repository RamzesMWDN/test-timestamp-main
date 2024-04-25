// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", (req, res) => 
{ 
  if(!req.params.date)
  {
    let dtUnix = Date.parse(new Date());
    let dtUtc = new Date(dtUnix);
    return res.json({unix:dtUnix,utc:dtUtc.toUTCString()});
  }
  let num = Number(req.params.date);
  if(!num)
  {
    let dtUnix = Date.parse(req.params.date);
    let dtUtc = new Date(dtUnix);
    if(!dtUnix)
    {
      return res.json({error:dtUtc.toUTCString()});
    }
    res.json({unix:dtUnix,utc:dtUtc.toUTCString()});

  }
  else
  {

    //let dtUnix = Date.parse(num);
    let dtUtc = new Date(num);
    res.json({unix:num,utc:dtUtc.toUTCString()})
  }

})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
