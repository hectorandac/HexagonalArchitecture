var express = require('express');
var app = express();
var {
    exec
} = require('child_process');

// Starts the web server.
var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/processor', function (req, res) {
    var body = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        console.log('All writes are now complete.');
        res.setHeader('Content-Type', 'application/json');

        exec('./index-macos -c \'' + body + '\'', (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            var result = JSON.parse(stdout);
            res.send(JSON.stringify(result), null, 3);
        });
    });
});

app.listen(port, function () {
    console.log('Escuchando en: 0.0.0.0:' + port);
});