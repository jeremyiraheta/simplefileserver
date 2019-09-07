let express = require('express');
let app = express();
const folder = '/simpleftp';
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

function getfiles(f = dm + folder) {
  let dir = '<li><a href="..">..</a></li>';
  let files = fs.readdirSync(f)
  let parent = '/';
  parent = f.substring((dm + folder).length)
  files.forEach(file => {
    let s = ""
    let isdir = fs.lstatSync(f + "/" + file).isDirectory()
    if (isdir)
      s = "/"
    dir += '<li><a href="' + parent + file + s + '">' + ((isdir) ? "+" : "*") + file + '</a></li>'
  })
  return dir;
}
let files = function (dir, resp) {
  let out = getfiles(dir)
  resp.writeHead(200, {
    'Content-Type': 'text/html'
  });
  resp.end('<html><title>SimpleFile Server</title><h1>SimpleFile Server</h1> <br><hr> ' + out + '</html>');
}

app.get("/", function (req, resp) {
  files(dm + folder, resp);
});
app.get("/*", function (req, resp) {
  let file = dm + folder + req.url
  let fls = ""
  if (fs.lstatSync(file).isDirectory())
    fls = fs.readdirSync(file)
  if (fls != "") {
    files(file, resp)
    console.log('Opening Directory ' + file);
  } else {
    resp.sendFile(file);
    console.log('Sending File ' + file);
  }
});
var server = app.listen(8081, function () {
  var host = ip;
  var port = server.address().port;

  console.log("SimpleFile Server Listening at http://%s:%s", host, port)
})