const mailClient = require('./local_modules/external-mailer.js');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/mail', function(req, res) {
    // Verify contents
    if (req.body.html == undefined) {
        console.log("Body not recognized. Ending execution. No email Sent");
        res.sendStatus(500, "Email contents were not recognized by the recieving server. Please try again.");
        return;
    }
    if (req.body.name == undefined) {
        console.log("Name was not specified. Email Not Sending");
        res.sendStatus(500, "Name was not correctly specified in email output. Email could not be sent. Please try again.");
        return;
    }
    // Send mail - Successful
    var html = req.body.html;
    mailClient.sendMail('laspencer@live.com', 
                        'laspencer@live.com', 
                        `${req.body.name}'s Employee Application`, 
                        'Application Attached.\n' +
                        'To print: Open HTML In Chrome -> Right Click -> ' +
                        'Print -> Change Destination to Save As PDF -> Print', [{filename: req.body.name+'_application.html', content: html}]);
    console.log("Application Sent Successfully");
    res.sendStatus(200);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});