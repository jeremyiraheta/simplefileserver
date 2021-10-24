let express = require('express');
let app = express();
const path = require('path');
const folder = path.sep + 'simpleftp';
const dm = process.cwd();
const fs = require('fs');
const virtual = 'virtual.map'
const mapping = 'mapping/'
const ifolder = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC6ElEQVR42oWTS2hTaRTHf1+aptomoVWb1rZUJVDUsVDFRR2tC+0MjC+MFbUy+NYWZaCzEbvQWQwqLlwo9bWwTDcq4gNEXKqLKTILqQ/qq3Hw3ak1jekjaUxyr//0VsGNE/hxc/m+8z/n/M+5hv/5hZbgP3eKW8aN27iIWKN4sSkc9XO5qIJW8+Xi781ULaxjaXSI9wMRoh8jfByKMrJhHg2zp3IQC2xBRug5sZru/BrmfBV40k5HwMcmO62LWXTRTunABpfn2+Dsf28tN/PnstSsWIZv1Up+Cs1gvytBTc5EyPWDW7jyof+anraTJDMsEo6g52cuB35krQlf41SwnGbcuuEVeSIustklMvwKYn+r5EoomCrhALw6DjlruTCtnkYTvkB7cDpbKVTAFJEr+p1Sx94jYkSoLQad856TyrWdi2X1rDd3TnCodi6tYxUUi9LxXrOBkx0viIl/wcScqh4fhbIWrhfWs9JcOsCehtW0WeozddtHKumRiXGswQRWIkcZK/F4fORVP8A9Lt59DCr30OlfwSJzvInQb79yJTMNBv4sIr23C5esD21u5/SZnZTOqCDdtpVJczqYEJTAMwn8BRXr6ClspMrsC1F7uIk79jzoPQtJezPepjaOdAzRsq2EVOd5kue3UPVH2pnGc3h0DkoWEJ+ymwKzbTHBs62Es/1bvWr1gVz+x0uyYBauRC/F5W/4YYeG83Dcn7cQvqeJFMH+x5SaUA2Tr7TwIbswYybOl5Acz2h8rgFRI/OyI+0SYZFUpfJhRKZeLaPO/DIT/41d8rlch1WO82T38/V40GxRJj5oIk8dkbjeu9Xuy43sNGuCBC4100edLviUWcEZZUh3ayqPlLAERrUjce1CvE+Z72uJtFCVqrb9rvZglg9zbCH3rflUD2v2gy+0AjGS/0WJ9A3zLpLgXSxFfzzD0CeLUZESn1KGJ71Jro59TLmGQLGH5SmLzGCGnqSFZIg6HWN/73P/DI+aFu9RMXMTAAAAAElFTkSuQmCC"
const ifile = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADlklEQVR42iWSf2iUZQDHP8/7a/fe7jZvW9uipRdTXAuHUkzmxEYGSZayCorUrh8ro6gk8Z/CP4QiimTpzBylXq0lhYEZJE47QcQMWyycIf7I5qaed9vdzd3P9733fXuWz3/PH8/n+cDnK149mTE3hfp3ttZknr2cn7nSl95+xlQNza8AAlwPbBeKDkyX8Qwvpy+1flm1ytl9RpvMvyIGTg1sWRfa80neM1HsAuPGCn52t8oH8o6HIwFl7w5gygJHCMYSHl0zn7PJ39cr/jz+4jet1ec3FLIeiq5hanlOW4/wRfq9/xVmIXgujjtr4+FKpZzlUc4k+Ux/6VcxfOiZgbA9vL6UsvBVGxi1fnzeNNtvf8R5VqOTJyF/1nRF4rw7IGmRmnbYnOiJidFdS76uzV55YSrtI2M04vh1REUNDQ9vJdS0GMW1GL5WoG/UIqvr6EIayWNrVUQuvnlcXHvXiI7qyyIHFn7KWMGPmsnT/3QTCxY2MDR0lMbGu2lra+PU2TG2/FbAFzCoa6hBrZ7DY7GeI+LcG9XRXcuGIrmWdqYTJcIzCXY+VSedTfbu3UtzczNdXV3kp1I8f3ASt6GOmlCQGUfn8WMbjonDb7VHd684Eqmt8VOwwX8ryf7uIFpwDoODg4TDYTo7O5kYi7Mx5lB1bwjb04hndV47tTYm9rz+ZHR/e3+k2nAIVFVybTzL+vos76wJM37jOoFAJQHFx+aDE/zlu4tQbZBgcoT5hTMs/3tfTOx4uTv6bUdfxLBnUDUVR4a/cTXDA6ZNZ3OAouUQu5zjlhHgnuY6hMz3QXodLaUL3LxITHy1cU30xye+j+Ti10mlsrK1nJ+s78pfXWbTCVQsFM8m61awIv0TvfXbSP1rkx8rxcQPPR3RfauPRPyqRxNF7g+pzA1Arc/BDJgIVcUWOslklkv5IGLofbqLvcT/kNP0pMFQZF704+VHI9sWV/Dg5AjFGxOkR85h5QoIw5AjdAksmI83maD00KNMTHzHfVcPkLosB2VLwKX1xo7NLQNv32Yh4d8PM+/Saari/2CWbqOVi8j1YmmVZBwDscile2UGM58jN15GszgkPlzE0taO1hPH654zb+pzyYsgdq4MhZIEWJhejnpuscQcZaU4SSCTwZa5k1MqJ+KsFaoZrGuv1yNLG602xW+almb6ynqF4SqaKrev6E6JilLOVfIlp2CpsolSdByncD6rXzgbL3z5Hx4aoA5ERZz8AAAAAElFTkSuQmCC"
const favico = '<link rel="shortcut icon" href="data:image/x-icon;base64,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" />'
const os = require('os');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);
let secretKey = crypto.createHash('md5').update("VBORw0KGgoAAAANSUhEUgAAABgAAAAY").digest("hex");
const fileUpload = require('express-fileupload');
var ifaces = os.networkInterfaces();
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({
  createParentPath: true
}));
let ip = '';
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    if (alias >= 1) {
      ip = iface.address.toString();
    } else {
      ip = iface.address.toString();
    }
    ++alias;
  });
});

function getfiles(f = dm + folder) {
  let dir = '<div style="display:inline-block;width:15px;height:15px;"></div><a href="../?token=' + gentoken() + '">..</a><br>';
  let files = fs.readdirSync(f)
  let parent = '/';
  if (f.startsWith(dm + folder))
    parent = f.substring((dm + folder).length)
  else
    parent = f
  files.forEach(file => {
    let s = ""
    let isdir = fs.lstatSync(f + path.sep + file).isDirectory()
    if (file == virtual)
      return
    if (isdir)
      s = "/"
    dir += '<div ' + ((isdir) ? "class=ifolder" : "class=ifile") + '></div><a href="' + encodeURIComponent(file) + s + '?token=' + gentoken() + '">' + file + '</a><br>'
  })
  return dir;
}
let files = function (dir, resp, mappingstr = "") {
  let out = getfiles(dir)
  let map = getMapping()
  if (map != null && dir == dm + folder) {
    Object.keys(map).forEach(e => { //solo lee mapping del folder raiz
      out += '<div class=ifolder></div><a href="' + mapping + e + "/?token=" + gentoken() + '">' + e + '</a><br>'
    });
  }
  resp.writeHead(200, {
    'Content-Type': 'text/html'
  });
  resp.end('<html><head>' + favico +
    '<style>body{background-color=black;font-color:white;} .ifolder { background:url(' + ifolder + '); display:inline-block; width:15px; height:15px;} .ifile { background:url(' + ifile + '); display:inline-block; width:15px; height:15px;}</style></head>' +
    '<title>SimpleFile Server</title><h1>SimpleFile Server</h1> <br><form method=post action=/upload?token=' + gentoken() + '&path=' + encrypt(dir) + ' enctype="multipart/form-data"><input type=file name=attch /> <input type=submit value="Subir" /></form><hr> ' + out + '</html>');
}

function replaceGlobally(original, searchTxt, replaceTxt) {
  const regex = new RegExp(searchTxt, 'g');
  return original.replace(regex, replaceTxt);
}
let getMapping = function () {
  let vect = new Array()
  let content = ""
  try {
    content = fs.readFileSync(dm + folder + path.sep + virtual, 'utf8')
  } catch (error) {
    return
  }
  if (content.split("=").length > 0) {
    content.split("\n").forEach(e => {
      let s = e.split("=")
      if (s.length > 0) {
        if (s[0] != "" && s[1] != "")
          vect[s[0]] = s[1]
      }
    });
  }
  return vect;
}
app.post("/", function (req, resp) {
  if(req.body !== undefined )
  {
    if(req.body.user == 'admin' && req.body.pass == 'brandom')
      resp.redirect("?token=" + gentoken() )
  }
  try{
    resp.redirect("/")  
  }  catch(ex){}
})
app.get("/", function (req, resp) {  
  if(req.query.token == null)
  {
    var options = {
        root: path.join(__dirname, "forms")
    }; 
    resp.sendFile("login.html", options, (err) => {
        if(err)
            console.log(err)
    });
  }
  else if(validate(req.query.token))
    files(dm + folder, resp);
  else
    resp.redirect("/");  
    
});
app.get("/*", function (req, resp) {
  if (!validate(req.query.token))
    resp.redirect("/")
  if(req.params[0] == mapping)
    resp.redirect("/?token=" + gentoken() );
  let file = dm + folder + replaceGlobally(req.url.substring(0,req.url.indexOf("?token")),"/",path.sep)
  let mdir
  if (req.url.indexOf(mapping) >= 0) {
    var map = getMapping()
    mdir = req.url.substring(req.url.indexOf(mapping) + mapping.length)
    if(mdir.indexOf("/") > -1)
      mdir = mdir.substring(0,mdir.indexOf("/"))
    else
      mdir = mdir.substring(0, mdir.indexOf("?token"))
    file = req.url.substring(mapping.length + 1).replace(mdir, map[mdir])
    file = replaceGlobally(file, "/", "\\")
    file = file.substring(0, file.indexOf("?token"))
  }
  file = decodeURI(file)
  if (fs.lstatSync(file).isDirectory()) {
    files(file, resp, mdir)
    console.log('Opening Directory ' + file);
  } else {
    resp.sendFile(file);
    if (file.toLowerCase() != virtual)
      console.log('Sending File ' + file);
  }
});

app.post("/upload", async (req, res) => {
  try {
      if(req.files) {
        let file = req.files.attch;            
        let p = decrypt(req.query.path);      
        let dir = p + path.sep + file.name;
        file.mv(dir);        
      }
      res.redirect("../?token=" + req.query.token);
  } catch (err) {
      res.status(500).send(err);
  }
});

let encrypt = (text) => {
  
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString('hex')
}

let decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

    return decrpyted.toString();
}

let validate = (key) => {
  return key == encrypt(new Date().toDateString())
}

let gentoken = () => {
  return encrypt(new Date().toDateString())
}

var server = app.listen(8081, function () {
  var host = ip;
  var port = server.address().port;

  console.log("SimpleFile Server Listening at http://%s:%s", host, port)
})