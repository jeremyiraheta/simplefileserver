let express = require('express');
let app = express();
const folder = '/simpleftp/';
const dm = process.cwd();
const fs = require('fs');
var os = require('os');
var ifaces = os.networkInterfaces();
let c = 0;
let ip = '';

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      ip = iface.address.toString();
    } else {
      // this interface has only one ipv4 adress
      ip = iface.address.toString();
    }
    ++alias;
  });
});
let dir = '';

function getfiles() {
  fs.readdir(dm + folder, (err, files) => {
    files.forEach(file => {
      dir += '<li><a href="/' + file + '">' + file + '</a>';
      c++;
    });
    if (err)
      console.log(err.message());
  });
}
getfiles();
app.get("/", function (req, resp) {
  getfiles();
  resp.writeHead(200, {
    'Content-Type': 'text/html'
  });
  resp.end('<html><h1>SimpleFile Server</h1> <br><hr> ' + dir + '</html>');
  dir = '';
});
app.get("/*", function (req, resp) {
  var file = dm + folder + req.url
  resp.sendFile(file);
  console.log('Sending File ' + file);
});
var server = app.listen(8081, function () {
  var host = ip;
  var port = server.address().port;

  console.log("SimpleFile Server Listening at http://%s:%s", host, port)
})