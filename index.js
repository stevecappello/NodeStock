const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT = process.env.PORT || 5000;

//https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=ULK8PTT5M7XQPP5C';
//API  alphavantage key VFBOQBRHB2R29T9H
//var url = 'https://api.polygon.io/v1/open-close/AAPL/2023-01-09?adjusted=true&apiKey=z64MlGUYqHHkWPilDyFRpBpDmzcOkvOR'

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});

// Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const otherstuff = "Nina is a perfect angel! Know it!!";

//Set Handlebar Routes
app.get('/', function (req, res)  {
	res.render ('home', {
		stuff: otherstuff
	});
});

//Create "About" page route
app.get('/about.html', function (req, res)  {
	res.render ('about'); 	
});
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT , () => console.log('Server Listening on Port ' + PORT ))

