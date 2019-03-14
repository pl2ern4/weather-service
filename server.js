const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var Papa = require('papaparse');
var file = './data.csv';
var content = fs.readFileSync(file, "utf8");
const app = express();
var rows;

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    Papa.parse(content, {
        dynamicTyping: true,
        header: true,
        complete: function(results) {
        rows = results.data;
        }
    });
  res.send({...rows});
});

app.listen(port, () => console.log(`Listening on port ${port}`));