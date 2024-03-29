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
const del = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA10lEQVR42mNkwA5sgdgViJWg/HtAvBuID6MrZETjmwFxHVThFiC+DRVXBWIfqMFNQHwKmwFhQOwFxDlA/AWHy3iAeAoQbwPiVcgGgGzOAuJEIP7PgB+A9MwH4mkgl8AMADk3Ao/N2FyyAuQtRqi/rIC4E0nBPGhYPIHyZYC4EYiTkdSUA/ExRmigrATiq0iSIA1zgDgFyoexnyCp0QbicJABS4A4CYh/oTkTZggDFs0gwAZyKVUMoNgLxAZiE9SlGIFIcTSCAMUJCQQoSsowQFFmQgZEZ2cAYORE193otZgAAAAASUVORK5CYII="
const private = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABX0lEQVRIie2WT0rDQBSHP110Y4sLoSdxKdS4snTrSQQpiAuhm3qOHsD+ce8N1DM0rSioC+tCEIyLvBA7TiaTyQy46A8egbzfm28mk3kJbGRWGxgA98AH8AzcAqfAbijoCfAOJAXxBByHgH4L4BroADsSh8BYcl9Azxe0Tb7SM4OvL543YM8HeEC+0jJNxXvpA/wgg3UsvJF473yAVzJY08LbEu/KBzh7a736t52nU1M6cA9Y8HfmRedXDdUfA12bycQVILYxVyFbGnCV/ayiNZbLHk9Iu1VTIgJm9edlfmR9Q915Sa0zeCz5BnAFPAKvpC010ywEOOtcQ+X+wS94ZKh3Bmeda6nJvUiuZahfk68G8ilX3SnRqgp4X64jTW6keJxU9Kimkm+Q7vNSYij3AG4M9c7ghPTIFOmipLYWOCE9MhF5AzkqWakW/K9a5iIANLYxdfH7hZoT4Ld3I2v9AOcG3ZYByeaQAAAAAElFTkSuQmCC"
const public = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABZUlEQVRIie3UvUocURjG8d8mZkWsAoGFtVDQ0gsQI0lIICiChY3JPVjY2Klo4SUIXoGJEEgI2EtISptcQMCvzkINCsHoWMwZZ12dndnNNEL+cGB4z3ueZ973fPCfh0ANC9jBMc7wE6uo/6v4NI4QZYwTvOtUfAp/g9AW3uApevEKX8LcFWaKir7EJg7DwghLLfJXpJXUWgl3Yd3dFnxFpcW6iri6KJhlkoifYRGDeByM83gtbdVu0OpvTHjRID5SQLCZHly6XflvvE0SPobgYgfiCX2oYhifgt4pBog3NBK3pQwqeI9f4nb5EwyqJRkkPMM27VcwiQPsYyInPg0f5J/3Rvalm7mXE38CYyF4jtGSDW5YazBZxpD4HtzHRBDbw3iBOOILlZhkjc8FqsvlOTbCnyQP3QVmtX4ySqEbc/ghvkSn4XtOesTnM+KF+C67fd9CTr053k7ZUc58onUr71EbBh1xDdOggP14nXHDAAAAAElFTkSuQmCC"
const home = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAqFJREFUOE91k91LU3EYx7+/tXO26eac20R8aYVmNQnR0ExaM0htXXSRXXdRluRVlK4LKy2QSNHLFAX7AyIJCbe0yBdokmlUllmWNhfSXM3Nl+2czXNi58xh0353D7/n++F5+T4EcY/nQTCq1IGENIBEI35zXvCUF6ZVDyHgt0pIJOAHoQZNXwVBCThJcWgNKeyKBKE14RtUIg9axYFS8ssANwHsGoMk2EZM8IqAEVm95x3d8mNAAd93CqxPFMY/OomDOjsMQ0UAunzWSo4zrSJgWN40+1jRONubKGhotRpZlRYk5+4X4uUvM1iw94P1+4U45+wacqoCd4g52LQNoDloROHNRlBaLaBSikX4VxH67cFk8114pz/9H+B8kQ7Tgy4gIx1tfXYMO1wgBDCXZOLamVOA6ydGay9j98nFnSvgpRex70I17g8O4c2HVDAeiVCAPHUDh41u3Cg/ga893SAbPTsD1MYW6C0WnK7rgJQpgtw1JgACWUcQpsZha6uFu98G/7Q1HiCrm3ua0KrMjgLqOyAN/gvYkI2jv1UErM9bsceyfp2UMe3RNdLn3BOyR76FmlgLEx/1CCxJQEAg03EoynPDWl4mtJBs6IK+gKkiZrZXBLxCSnhFvui4tZcuaekGMjPQ3mfHkGNBaKHsaFZsiI76SyhtnmOlimBazEgCZEjWPW9TVP+aLEZhw21QWh2QtH2NaUWvYagMdBIzcyWii1mOf6nScYR5O9WpzvS81wtGUuceiBrpM1zPbNDnL+FQjc8Jmi0gpfjzD0C0NG3kOAw47QkZ354kILQqrpFS8oJ5DBXrTkhJBTnGzGzafJvp+ecqLWj2Xpgh571TlCySqMkLBaVy/iEI0xDpe+uN7Hw10cEiTJuEZMKOxAs3IX8BMBotIOqiE8oAAAAASUVORK5CYII="
const back = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAi1JREFUOE9jZMAD2PQcIn5dOrCFgYHhCy5ljLgk2G0CfeQsHObd7slXY2Bg+ECSAey2we4OkUnL/zEx8ezO8BQjyQAOu0An2/CkVapKisK3Hz/7e2Tx1FJmTp6fIBewMjEwsDMzg2nG758vPdqz/giKFzisA22sIxLXqqsoif3+x8Dw+98/hq+//zE8+fKL4c33nwzc7EwM3GxMDNzsjAyvDmyecGFyayHcAE7rIAuLsLj1mmoqEr///Wf4AzLg/3+Gm+++Mbz/+RuumYedEWzIs72bJ5yc0AwxgMs2yMg0OHaztrqqFEzzr3//Gc69/Mzw+/8/hM1sjHD2472bJxzqaoQa4BjkbRORtlReRpr/738GsO03339jePvjF9TJIKcjNIO88mDnxgm72qEGgFzB4xIeZBGWPF9KQpLvw68/DNfefmHgYmNigDkZ4X+IYXe2b5iwuRnJAJAhfK4xkcYh8bM+sPLw/GX8B1bIAw84VFdc27J+wrqGBkQgwhKKgHtUrKRH+FQBMVFe1u8f/rw+tLWXh5vrNysLAwMbCxMYc7AwMHx6/PjsgSVLNmBNiVK+sckqAZGT2P/9YtmdGiBOUkKCuUQ9NDFT3tquc1dBohypBoBcBXaZmptP+a1dW2YwMDB8YmBg+I+E4VkD2QsgNjMDAwMLKNUyMDCwQfkg8X8MDAx/GBgYfjMwMPxiYGD4CxX7DzMAphGkiQMJg/hMUI2g/PADikFskEF/AB2jvxHqYpt7AAAAAElFTkSuQmCC"
const edit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvl1btNxEAQgOHvGoAEiYBHTgA5ISKCKoiQqAGJh5CoAYivCBJIaQCJAogQJBSAwIN8p5Wxj/Uejthsrd3/98x4xiMDr9HAfH8pOMMHLtKXbgr2cYOVGZEF5ADj5EzAT+v9SSppCp6x2hO+jEcsJfeOcRn7puCzPpSbuoC+YQt3ieS84kRUcwkCcITdOoIN3OOq4obge5VGkOb8BTt4QqQr9tNVIkjhE1BAN/HarF9fQRs8mPF8mpbSCHLh23joW4M+8Fss9hHkwoP5joX048mpwaQ30tR25fxHH5UIOgtajYu5BbPgEWGRoM9E/weC38Z1TrqCsd7VB3u4xloOqeVMwA8RzdY6TQu53ddyfyzF4sEFX55DRBlfi0NKAAAAAElFTkSuQmCC";
const os = require('os');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);
let secretKey = crypto.createHash('md5').update(new Date().toGMTString()).digest("hex");
const busboy = require('connect-busboy');
const { escape } = require('querystring');
var ifaces = os.networkInterfaces();
var user = process.env.USER_SFS || "admin";
var pass = process.env.PASS_SFS || "admin";
var port = process.env.PORT_SFS || 8080;
var public_files = []
var count = 0
var counti = 0
app.use(express.json());
app.use(express.urlencoded());
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
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
    let filepath = f + path.sep + file
    let isdir = fs.lstatSync(filepath).isDirectory()
    if (file == virtual)
      return
    if (isdir)
      s = "/"    
    if(public_files.includes(encrypt(filepath)))
      dir += '<div ' + ((isdir) ? "class=ifolder" : "class=ifile") + '></div><a title="Public" href="' + encodeURIComponent(file) + s + '?id=' + encrypt(filepath) + '">' + file + '</a>' + (file.endsWith(".txt") ? editButton(filepath, file) : "") + deleteButton(file) + visibilityButton(filepath) + '<br>'
    else
      dir += '<div ' + ((isdir) ? "class=ifolder" : "class=ifile") + '></div><a title="Private" href="' + encodeURIComponent(file) + s + '?token=' + gentoken() + '">' + file + '</a>' + (file.endsWith(".txt") ? editButton(filepath, file) : "") + deleteButton(file) + visibilityButton(filepath) + '<br>'
  })
  return dir;
}
let files = function (dir, resp, mappingstr = "") {
  let out = getfiles(dir)
  let map = getMapping()
  if (map != null && dir == dm + folder) {
    Object.keys(map).forEach(e => { //solo lee mapping del folder raiz
    out += '<div class=ifolder></div><a href="' + mapping + e + "/?token=" + gentoken() + '">' + e + '</a> ' + deleteButton(e) +  '<br>'
    });
  }  
  resp.status(200).type('html').send('<html><head>' +
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">' +
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>' +
  '<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>' +
  '<script src="/forms/editor.js"></script>' +
  favico +
  '<style>body{background-color=black;font-color:white;} .ifolder { background:url(' + ifolder + '); display:inline-block; width:15px; height:15px;} .ifile { background:url(' + ifile + '); display:inline-block; width:15px; height:15px;} .del { background:url(' + del + '); display:inline-block; width:16px; height:16px; position: relative; left: 5px; top: 2px;} .public { background:url(' + public + '); display:inline-block; width:24px; height:28px; position: relative; left: 10px; top: 2px;transform: scale(0.7) translateY(9px);} .private { background:url(' + private + '); display:inline-block; width:32px; height:32px; position: relative; left: 10px; top: 2px; transform: scale(0.6) translateY(12px);} .edit { background:url(' + edit + '); background-repeat: round; display:inline-block; position: relative; width:32px; height:32px; transform: scale(0.6) translateY(15px);}</style></head>' +
  '<div class=container><title>SimpleFile Server</title>'+
  '<h2><a href="/">SimpleFile Server</a></h2> <br>' +
  '<form method=post action=/upload?token=' + gentoken() + '&path=' + encrypt(dir) + ' enctype="multipart/form-data">'+
  '<div class="progress" id="proc" style="display:none">' +
  '<div class="indeterminate"></div>' +
  '</div>' +
  '<div class=row><div class="col s12 custom-file">' +
  '<div class="col s9 file-field input-field"><div class="btn"><span>Select</span><input type=file name=attch id=files required multiple onchange="document.getElementById(\'count\').value=document.getElementById(\'files\').files.length;"/></div><div class="file-path-wrapper"><input class="file-path validate" type="text" placeholder="Select files"></div></div> <input type=submit class="btn-large" value="Upload" onsubmit="document.getElementById(\'proc\').style=\'display:block\';this.disabled = true;document.getElementById(\'btnCF\').disabled=true;" />' +
  '<input type=hidden name=count id=count value=0 />' +
  '</div></div>' +
  '</form><div class=row>'+
  '<form method=post action=/createdir?token=' + gentoken() + '&path=' + encrypt(dir) + ' > '+
  '<div class"input-field col s12"><input type=text name=dir id=dir class="col s3" placeholder="New Folder" required /></div> <input type=submit id="btnCF" class="btn-small" value="Create" /></form></div><div style="text-align:end;"><a href="/?token=' + gentoken() + '"><img src="' + home +'" title="Home" /></a><a href="../?token=' + gentoken() + '"><img src="' + back + '" title="Back" /></a></div><hr>' +    
  out + 
  '<hr></div>' + modalEdit() + '</html>');
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
    if(req.body.user == user && req.body.pass == pass)
      resp.redirect("?token=" + gentoken() )
  }
  try{
    resp.redirect("/")  
  }  catch(ex){}
})
app.get("/delete", function(req, resp){
  public_files = public_files.filter((itm) => itm !== req.query.id)
  let targ = decrypt(req.query.id);
  let referal =  req.headers.referer;
  let file;
  if(referal == undefined) resp.redirect("/");
  if(referal.indexOf(mapping) > -1)
  {
    let m = /mapping\/(.*?)\/(.*)\?token/g
    let result = m.exec(referal);
    let map = getMapping()[result[1]];
    file = path.join(path.join(map, result[2]), targ);
  }else{
    let m = /\d{2,4}\/(.*)\?token/g
    let result = m.exec(referal);
    file = path.join(path.join(__dirname,path.join(folder, result[1])), targ);
  }
  if(fs.lstatSync(file).isDirectory())
    fs.rmdirSync(file, { recursive: true });
  else
    fs.unlinkSync(file)
  resp.redirect(referal);
});

app.get("/switch", function(req, resp){
  const id = req.query.id
  if(public_files.includes(id))
    public_files = public_files.filter((itm) => itm !== id)
  else
    public_files.push(id)
  persist()
  let referal =  req.headers.referer;  
  if(referal == undefined) resp.redirect("/");  
  resp.redirect(referal);
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
app.get("/forms/*", function (req, resp) {
    var options = {}; 
    resp.status(200).sendFile(path.join(__dirname, req.path), options, (err) => {
        if(err)
            console.log(err)
    });
});
app.get("/open", function (req, resp) {
  if(req.query.id == null){
    resp.status(500).end("No defined id");
    return;
  }
  let file = decrypt(req.query.id);  
  if(!file.endsWith(".txt"))
  {
    resp.status(500).end("No valid format");
    return;
  }
  var options = {}; 
  resp.status(200).sendFile(file, options, (err) => {
      if(err)
          console.log(err)
  });
  
});
app.get("/*", function (req, resp) {
  if (!public_files.includes(req.query.id))
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
    file = file.substring(0, file.indexOf("?token"))
  }
  file = decodeURI(file)
  if(public_files.includes(req.query.id))
    file = decrypt(req.query.id)
  if(file != undefined){
    if(fs.existsSync(file))
    {
      if (fs.lstatSync(file).isDirectory()) {
        files(file, resp, mdir)
        console.log('Opening Directory ' + file);
      } else {
        resp.sendFile(file);
        if (file.toLowerCase() != virtual)
          console.log('Sending File ' + file);
      }
    }else{
      var options = {
        root: path.join(__dirname, "forms")
      }; 
      resp.status(404).sendFile("notfound.jpg", options, (err) => {
          if(err)
              console.log(err)
      });
    }
  }  
});
app.put("/edit", async (req, res) => {  
  if(req.query.id == null) return;    
  let file = decrypt(req.query.id);    
  if(fs.existsSync(file)){    
    fs.writeFile(file, req.body.content, (err) => {
      if(err)
        console.log(err)    
    })
    res.status(200).end("Saved...");
  }
});
app.post("/upload", async (req, res) => {
  try {
      req.pipe(req.busboy);        
      req.busboy.on('field', (name, val, info) => {
        if(name == 'count')
          count = val
      });  
      req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);        
        let p = decrypt(req.query.path);              
        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(p, filename));
        // Pipe it trough
        file.pipe(fstream);
 
        // On finish of the uploada file
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);                     
        });// On finish of the upload all files
        fstream.on('finish', () => { 
          counti++
          if(counti == count && count != 0)           
          {
            count = 0
            counti = 0
            res.redirect('back');
          }
        });
      });
  } catch (err) {
      res.status(500).send(err);
  }
});
app.post("/createdir", function (req, resp) {  
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
  {
    let dir = decrypt(req.query.path);
    fs.mkdirSync(dir + path.sep + req.body.dir);  
    let backURL=req.header('Referer') || '/';      
    resp.redirect(backURL);
  }
  else
    resp.redirect("/");  
    
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

let encryptArray = (arr) => {
  let ret = []
  arr.forEach(text => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    ret.push(encrypted.toString('hex'))
  });
  return ret
}

let decryptArray = (arr) => {
    let ret = []
    arr.forEach(hash => {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

        ret.push(decrpyted.toString());
    });
    return ret
}

let validate = (key) => {
  return key == encrypt(new Date().toDateString())
}

let gentoken = () => {
  return encrypt(new Date().toDateString())
}

let deleteButton = (target) =>{
  const id = encrypt(target)  
  return '<a class=del title="Delete" href=# onclick="if(confirm(\'Are you sure to delete?\'))window.location = \'/delete?id=' + id + '\'"></a>'
}
let visibilityButton = (target) =>{
  const id = encrypt(target) 
  var state = "private"
  if(public_files.includes(id)) 
    state = "public"
  return '<a class=' + state + ' title="Visibility" href=# onclick="window.location = \'/switch?id=' + id + '\'"></a>'
}
let editButton = (target, name) => {
  const id = encrypt(target)
  return '<a class=edit title="Edit" href=# id="' + id + '"  name="' + name + '"></a>'
}

let persist = () =>{
  fs.writeFile('public.txt',JSON.stringify(decryptArray(public_files)), (err) => {
    if(err)
      console.log(err)    
  })
}
let modalEdit = () => 
{
  return "<div id=\"modale\" class=\"modal modal-fixed-footer\">"
    + "<div class=\"modal-content\">"
    + "<h4 id=modal_title></h4>"
    + "<textarea id=modal_content style=\"height:500px;width:1000px\"></textarea>"
    + "</div>"
    + "<div class=\"modal-footer\">"
    + "<a href=\"#!\" class=\"modal-close waves-effect waves-green btn-flat\">Cancel</a>"
    + "<a href=\"#!\" id=save class=\"modal-close waves-effect waves-green btn-flat\">Save</a>"
    + "</div>"
    + "</div>";
}
fs.readFile('public.txt',(err,data) =>{
  if(data)
    public_files = encryptArray(JSON.parse(data))
})

var server = app.listen(port, function () {
  var host = ip;
  var iport = server.address().port;

  console.log("SimpleFile Server Listening at http://%s:%s", host, iport)
})
