var express = require("express");
var path = require("path");
var app = express();

app.use(express.static('public'));

app.get('', async function (req, res) {
    res.status(200);
    res.sendFile(__dirname + '/views/index.html')
});

app.listen(3000, function () {
    console.log("App is listening at Port 3000");
})