let express = require('express');
let app = express();
const path = require('path');
const folder = path.sep + 'simpleftp';
const dm = process.cwd();
const fs = require('fs');
const virtual = 'virtual.map'
const mapping = 'mapping/'

const ifolder = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFC107" width="20" height="20"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>';
const ifile = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#90CAF9" width="20" height="20"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>';
const favico = '<link rel="shortcut icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAF5ElEQVR42p1Va2wUVRT+zrx2t9vSB7S0pUCLYqFFno2CKcVSUSQ8oiHaqGliEBU0iMpD5QcxvhLUxB8QIaAxIAEjmKgYEcQQnlGLQNACQksLKbT0QVu63Z3Zx/Wb2SXCXya5uTN37j3fOd/5zrmCu3gOZuKhySbetgShBNDemUCvqZARVRihA3oMOP5GCB/vdpCQuwHYn4GjUWAaDQqNKc4I891RyfdyE/JvApUvhXD0DoBaE/43/VijCRI36VmfQlcfcKNfoZejjyMyXsdYH/AjDWkxGnN4zjXq3DZyGcZNwYwlIRy6A+CzNDx/j4YvdK5qgBj0zn3nfnefordCThS9h2ucs3BWrlE3GoJ578N1RqAwem0YF+8A2JiGdRawIrUoiofJMeix+AX8hHQQIEh0A/8DRFNgNt9d4DGk6EAMWRts9Hq2NvgxY6iGCQHBwpDC9DSumq7LKolkJzwDyGcoXfzXyFAyJbk2wD08g37uiXBO5/oDFhLfRuH72kFMlmmYVyj43g2N/yROu1SEa0BoTyFF1xAtGUGRH2qvneSMKpIiHWoQP/I0yPEoVCvBq3yILwh5PkKeBd4ZAbw/kdaYROkiBVP4K0Ae2+ME42GDhoYaUORfqDulc2+YHttxUhZL8n6V/4oJfoKJmEmAJwZSALXAK2OA9UVIemXQ3QAHOYef84QAcImHskl6H8PrpoeXEyYOp5WgzGlDRaLPU1ED14NM4EnyVmMhvjsG65so62AB8GQJsKtS95QhJwMF6mygALND52QsGR6kuTxBCOom0NP90tz5yJ7zNOoP7pF1jbvUcOrqnyjEtKDq3QgIdCCB9K8cDEgNMLUCOJbvqsLwy4bKlWpc+b34a/dm2dl7RA01k8CGeJKVEGmblTMHgeJytLeclpVth1QVIjhHAN2EOkaAKgtyRqFgvYM2eZCyrdPR4ienTWZQPi2ep4LBIPqb/5A9kTOqiADMg1gpAFeWH0RzsEUbjJJol2ySblXMPfv6IUKAAwSYRpl2Cso/stEg5Tz/KHNWItAzSMcmK5erFhbEOrHMsuFSNMjwis0FcunyctEcTdYCpQ1GhfNulXHhBypsCuegjupVNg56dfA60MbFvBx6OJCSZp4ByaIE05IAhITyU1nOuAoVrpkPu4LE5A4T7Xqr6lyxGE3nL4jDKHcQaBwlW2bhmUUR7LgFcGqSgQmDfRYyHq5BevEo+CwTRsyBFYvCtCzo95Whv3IObuYVIxJLFqEFavTIz/B1tKJl5RLQOWwhwChanevH6vlhrPMAlpPCYl0emfXr7xIprVCeAVKqs1mY5MbURAxNKav9iqTnZavQh2sQWFiLrnffEmdKlUqMLMWV5XVefraRuiBV93IAn1eHsfQWwM7xhUVPTau/KN37f1IDF84if9JEsTpaldnZjuzK6dL/3holMUecjutKrl5GL7MiuiH29sPq5s4v0bd9I9PNgCiWbhbdYh/2zbXxmAewCthcneZ7Ia+hB02PT4Kv8ZyX0CC16R9dBm3qTOil9zMUymUghIRtI5aRidDkath/HoW2dhHGSBR7yVEz7Z1m0msttNQ5KPYAlrCSZ2lYGl/9iQypmqlix/bDKBwp0dIpSl1uhH7kFzEaTihfzBZferrq0dgLwmHozQ1idrer3rjX6KSZNaJRFHtjkNkGEvUKWR7Aq+zUo4AXXe7M8grlKyiC0dkm6Y2nlC8aQQ7ZUMlez7zQCM8kuNBDKrJZ4S3knd1Y2gjQwX/fEWAS16+xc3sArwHbKMPnFrHxX2KC212FaEndkyUMIzPs9aAB6gYoNJKt+m/buyq9ln1Nec0S+Tw3moNbe7bGMcwDqOMlw562rox10MtE8bpERJJ9x0p1U1KgXAO..."/>';
const del = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f44336" width="20" height="20"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1-1H5v2h14V4z"/></svg>';
const private = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9800" width="20" height="20"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V4c0-1.68 1.35-3.05 3.05-3.05 1.7 0 3.05 1.37 3.05 3.05v4z"/></svg>';
const public = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CAF50" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41 1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
const home = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24" height="24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>';
const back = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" width="24" height="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>';
const edit = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2196F3" width="20" height="20"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
const iview = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E91E63" width="20" height="20"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>';
const ivideo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9C27B0" width="20" height="20"><path d="M8 5v14l11-7z"/></svg>';
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

function getfiles(f = dm + folder, isPublicFolder = false) {
  let dir = '';
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
    let badge = isPublicFolder ? '' : (public_files.includes(encrypt(filepath)) ? '<span class="badge badge-public">Public</span>' : '<span class="badge badge-private">Private</span>');
    let href = public_files.includes(encrypt(filepath)) ? encodeURIComponent(file) + s + '?id=' + encrypt(filepath) : encodeURIComponent(file) + s + '?token=' + gentoken();
    let iconClass = isdir ? 'folder-icon' : 'file-icon';
    let actions = '';
    if (!isdir) {
      if (file.endsWith(".txt")) actions += '<span class="icon-btn edit-icon" onclick="triggerEdit(\'' + encrypt(filepath) + '\', \'' + file + '\')" title="Edit"></span>';
      if (isImage(file)) actions += '<span class="icon-btn view-icon" onclick="openImageModal(\'' + file + '\', \'' + encrypt(filepath) + '\')" title="View"></span>';
      if (isVideo(file)) actions += '<span class="icon-btn video-icon" onclick="openVideoModal(\'' + file + '\', \'' + encrypt(filepath) + '\')" title="Play Video"></span>';
    }
    if (!isPublicFolder) {
      actions += '<span class="icon-btn delete-icon" onclick="if(confirm(\'Are you sure to delete?\')) window.location = \'/delete?id=' + encrypt(file) + '\'" title="Delete"></span>';
      actions += '<span class="icon-btn ' + (public_files.includes(encrypt(filepath)) ? 'public-icon' : 'private-icon') + '" onclick="window.location = \'/switch?id=' + encrypt(filepath) + '\'" title="Visibility"></span>';
    }
    dir += '<div class="file-item">' +
      '<span class="' + iconClass + '" style="display:inline-block; width:24px; height:24px; margin-right: 12px;"></span>' +
      '<a href="' + href + '">' + file + (isdir ? '/' : '') + '</a>' + badge +
      '<div class="file-actions">' + actions + '</div>' +
      '</div>';
  })
  return dir;
}
let files = function (dir, resp, mappingstr = "", isPublicFolder = false) {
  let out = getfiles(dir, isPublicFolder)
  let map = getMapping()
  let folderName = dir.split(path.sep).pop() || 'SimpleFile Server';
  if (map != null && dir == dm + folder) {
    Object.keys(map).forEach(e => { //solo lee mapping del folder raiz
    out += '<div class=ifolder></div><a href="' + mapping + e + "/?token=" + gentoken() + '">' + e + '</a> ' + deleteButton(e) +  '<br>'
    });
  }  
  let headerContent;
  if (isPublicFolder) {
    headerContent = '<div class="header">' +
      '<h2><i class="material-icons" style="vertical-align: middle; margin-right: 10px;">folder</i>' + folderName + '</h2>' +
      '</div>';
  } else {
    headerContent = '<div class="header">' +
      '<h2><a href="/"><i class="material-icons" style="vertical-align: middle; margin-right: 10px;">folder</i>SimpleFile Server</a></h2>' +
      '<div class="action-bar">' +
      '<div class="upload-section">' +
      '<form method=post action=/upload?token=' + gentoken() + '&path=' + encrypt(dir) + ' enctype="multipart/form-data" onsubmit="document.getElementById(\'proc\').style=\'display:block\';document.getElementById(\'uploadBtn\').disabled=true;">' +
      '<div class="progress" id="proc" style="display:none">' +
      '<div class="indeterminate"></div>' +
      '</div>' +
      '<div class="file-field input-field" style="display: flex; gap: 10px; align-items: center;">' +
      '<div class="btn">' +
      '<span><i class="material-icons">cloud_upload</i> Select</span>' +
      '<input type=file name=attch id=files required multiple onchange="document.getElementById(\'count\').value=this.files.length; document.getElementById(\'fileCount\').value = this.files.length + \' file(s) selected\';"/>' +
      '</div>' +
      '<input id="fileCount" class="file-path validate" type="text" placeholder="No files selected" readonly>' +
      '<input type=submit id="uploadBtn" class="btn" value="Upload" />' +
      '<input type=hidden name=count id=count value=0 />' +
      '</div>' +
      '</form>' +
      '</div>' +
      '<div class="create-section">' +
      '<form method=post action=/createdir?token=' + gentoken() + '&path=' + encrypt(dir) + ' style="display: flex; gap: 10px; align-items: center;">' +
      '<input type=text name=dir id=dir placeholder="New Folder" required style="margin: 0;" />' +
      '<input type=submit id="btnCF" class="btn btn-small" value="Create" />' +
      '</form>' +
      '</div>' +
      '</div>' +
      '<div class="nav-buttons">' +
      '<a href="/?token=' + gentoken() + '" class="nav-btn"><i class="material-icons">home</i> Home</a>' +
      '<a href="../?token=' + gentoken() + '" class="nav-btn"><i class="material-icons">arrow_back</i> Back</a>' +
      '</div>' +
      '</div>';
  }
  resp.status(200).type('html').send('<html><head>' +
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">' +
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>' +
  '<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>' +
  '<script src="/forms/editor.js"></script>' +
  favico +
  '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">' +
  '<style>' +
  'body {' +
  '  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);' +
  '  min-height: 100vh;' +
  '  font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;' +
  '  color: #e0e0e0;' +
  '}' +
  '.container {' +
  '  max-width: 1000px;' +
  '  margin: 0 auto;' +
  '  padding: 20px;' +
  '}' +
  '.header {' +
  '  background: rgba(255, 255, 255, 0.05);' +
  '  backdrop-filter: blur(10px);' +
  '  border-radius: 16px;' +
  '  padding: 24px;' +
  '  margin-bottom: 24px;' +
  '  border: 1px solid rgba(255, 255, 255, 0.1);' +
  '  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);' +
  '}' +
  '.header h2 {' +
  '  margin: 0 0 16px 0;' +
  '  font-size: 28px;' +
  '  font-weight: 600;' +
  '  background: linear-gradient(90deg, #00d9ff, #00ff88);' +
  '  -webkit-background-clip: text;' +
  '  -webkit-text-fill-color: transparent;' +
  '  background-clip: text;' +
  '}' +
  '.header h2 a {' +
  '  color: inherit;' +
  '  text-decoration: none;' +
  '}' +
  '.action-bar {' +
  '  display: flex;' +
  '  gap: 16px;' +
  '  flex-wrap: wrap;' +
  '  align-items: center;' +
  '}' +
  '.upload-section, .create-section {' +
  '  background: rgba(255, 255, 255, 0.03);' +
  '  border-radius: 12px;' +
  '  padding: 16px;' +
  '  border: 1px solid rgba(255, 255, 255, 0.05);' +
  '}' +
  '.btn {' +
  '  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' +
  '  border: none;' +
  '  border-radius: 8px;' +
  '  transition: all 0.3s ease;' +
  '  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);' +
  '}' +
  '.btn:hover {' +
  '  transform: translateY(-2px);' +
  '  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);' +
  '}' +
  '.btn-small {' +
  '  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);' +
  '  box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);' +
  '}' +
  '.btn-small:hover {' +
  '  box-shadow: 0 6px 20px rgba(17, 153, 142, 0.6);' +
  '}' +
  'input[type="text"] {' +
  '  background: rgba(255, 255, 255, 0.05);' +
  '  border: 1px solid rgba(255, 255, 255, 0.1);' +
  '  border-radius: 8px;' +
  '  color: #fff;' +
  '  padding: 8px 12px;' +
  '}' +
  'input[type="text"]:focus {' +
  '  border-color: #00d9ff;' +
  '  box-shadow: 0 0 0 2px rgba(0, 217, 255, 0.2);' +
  '}' +
  '.file-list {' +
  '  background: rgba(255, 255, 255, 0.03);' +
  '  backdrop-filter: blur(10px);' +
  '  border-radius: 16px;' +
  '  padding: 20px;' +
  '  border: 1px solid rgba(255, 255, 255, 0.1);' +
  '  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);' +
  '}' +
  '.file-item {' +
  '  display: flex;' +
  '  align-items: center;' +
  '  padding: 12px 16px;' +
  '  margin: 8px 0;' +
  '  background: rgba(255, 255, 255, 0.02);' +
  '  border-radius: 10px;' +
  '  transition: all 0.2s ease;' +
  '  border: 1px solid transparent;' +
  '}' +
  '.file-item:hover {' +
  '  background: rgba(255, 255, 255, 0.08);' +
  '  border-color: rgba(255, 255, 255, 0.1);' +
  '  transform: translateX(4px);' +
  '}' +
  '.file-item a {' +
  '  color: #e0e0e0;' +
  '  text-decoration: none;' +
  '  flex: 1;' +
  '  transition: color 0.2s;' +
  '}' +
  '.file-item a:hover {' +
  '  color: #00d9ff;' +
  '}' +
  '.file-actions {' +
  '  display: flex;' +
  '  gap: 8px;' +
  '  opacity: 0.7;' +
  '  transition: opacity 0.2s;' +
  '}' +
  '.file-item:hover .file-actions {' +
  '  opacity: 1;' +
  '}' +
  '.nav-buttons {' +
  '  display: flex;' +
  '  gap: 12px;' +
  '  margin-top: 16px;' +
  '}' +
  '.nav-btn {' +
  '  display: inline-flex;' +
  '  align-items: center;' +
  '  gap: 8px;' +
  '  padding: 10px 20px;' +
  '  background: rgba(255, 255, 255, 0.1);' +
  '  border-radius: 8px;' +
  '  color: #e0e0e0;' +
  '  text-decoration: none;' +
  '  transition: all 0.3s ease;' +
  '}' +
  '.nav-btn:hover {' +
  '  background: rgba(255, 255, 255, 0.2);' +
  '  transform: translateY(-2px);' +
  '}' +
  '.icon-btn {' +
  '  display: inline-block;' +
  '  width: 32px;' +
  '  height: 32px;' +
  '  border-radius: 6px;' +
  '  transition: all 0.2s ease;' +
  '  cursor: pointer;' +
  '  background-size: 20px 20px !important;' +
  '  background-position: center !important;' +
  '}' +
  '.icon-btn:hover {' +
  '  transform: scale(1.1);' +
  '  filter: brightness(1.2);' +
  '}' +
  '.folder-icon { display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 8px; background: #FFC107; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z\'/></svg>") no-repeat center; }' +
  '.file-icon { display: inline-block; width: 20px; height: 20px; vertical-align: middle; margin-right: 8px; background: #90CAF9; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z\'/></svg>") no-repeat center; }' +
  '.delete-icon { display: inline-block; width: 20px; height: 20px; background: #f44336; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1-1H5v2h14V4z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1-1H5v2h14V4z\'/></svg>") no-repeat center; }' +
  '.public-icon { display: inline-block; width: 20px; height: 20px; background: #4CAF50; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41 1.41L10 14.17l7.59-7.59L19 8l-9 9z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41 1.41L10 14.17l7.59-7.59L19 8l-9 9z\'/></svg>") no-repeat center; }' +
  '.private-icon { display: inline-block; width: 20px; height: 20px; background: #FF9800; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V4c0-1.68 1.35-3.05 3.05-3.05 1.7 0 3.05 1.37 3.05 3.05v4z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V4c0-1.68 1.35-3.05 3.05-3.05 1.7 0 3.05 1.37 3.05 3.05v4z\'/></svg>") no-repeat center; }' +
  '.edit-icon { display: inline-block; width: 20px; height: 20px; background: #2196F3; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\'/></svg>") no-repeat center; }' +
  '.view-icon { display: inline-block; width: 20px; height: 20px; background: #E91E63; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z\'/></svg>") no-repeat center; }' +
  '.video-icon { display: inline-block; width: 20px; height: 20px; background: #9C27B0; -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M8 5v14l11-7z\'/></svg>") no-repeat center; mask: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'><path d=\'M8 5v14l11-7z\'/></svg>") no-repeat center; }' +
  '.badge {' +
  '  font-size: 10px;' +
  '  padding: 2px 8px;' +
  '  border-radius: 10px;' +
  '  margin-left: 8px;' +
  '}' +
  '.badge-public {' +
  '  background: rgba(0, 255, 136, 0.2);' +
  '  color: #00ff88;' +
  '}' +
  '.badge-private {' +
  '  background: rgba(255, 159, 67, 0.2);' +
  '  color: #ff9f43;' +
  '}' +
  '.modal {' +
  '  background: #1a1a2e;' +
  '  border-radius: 16px;' +
  '}' +
  '.modal-content {' +
  '  background: #1a1a2e;' +
  '}' +
  '.modal-footer {' +
  '  background: #16213e;' +
  '  border-radius: 0 0 16px 16px;' +
  '}' +
  '.file-path-wrapper input {' +
  '  color: #fff;' +
  '}' +
  '@media (max-width: 600px) {' +
  '  .action-bar { flex-direction: column; }' +
  '  .upload-section, .create-section { width: 100%; }' +
  '}' +
  '</style>' +
  '<script>' +
  'function triggerEdit(encryptedId, filename) {' +
  '  var token = new URLSearchParams(window.location.search).get("token") || "";' +
  '  document.getElementById("save").setAttribute("data-id", encryptedId);' +
  '  fetch("/open?id=" + encryptedId + "&token=" + token)' +
  '    .then(function(response) { return response.text(); })' +
  '    .then(function(content) {' +
  '      document.getElementById("modal_title").textContent = filename;' +
  '      document.getElementById("modal_content").value = content;' +
  '      var modal = M.Modal.getInstance(document.getElementById("modale"));' +
  '      modal.open();' +
  '    })' +
  '    .catch(function(err) { console.error("Error loading file:", err); });' +
  '}' +
  'function openImageModal(filename, encryptedId) {' +
  '  document.getElementById("imageModalTitle").textContent = filename;' +
  '  var token = new URLSearchParams(window.location.search).get("token") || "";' +
  '  document.getElementById("imagePreview").src = "/openimage?id=" + encryptedId + "&token=" + token;' +
  '  var modal = M.Modal.getInstance(document.getElementById("imageModal"));' +
  '  modal.open();' +
  '}' +
  'function openVideoModal(filename, encryptedId) {' +
  '  document.getElementById("videoModalTitle").textContent = filename;' +
  '  var token = new URLSearchParams(window.location.search).get("token") || "";' +
  '  document.getElementById("videoPlayer").src = "/openvideo?id=" + encryptedId + "&token=" + token;' +
  '  var modal = M.Modal.getInstance(document.getElementById("videoModal"));' +
  '  modal.open();' +
  '}' +
  'document.addEventListener("DOMContentLoaded", function() {' +
  '  var elems = document.querySelectorAll(".modal");' +
  '  var instances = M.Modal.init(elems, {' +
  '    dismissible: true,' +
  '    opacity: 0.7,' +
  '    inDuration: 300,' +
  '    outDuration: 300' +
  '  });' +
  '});' +
  '</script></head>' +
  '<div class="container">' +
  headerContent +
  '<div class="file-list">' +
  out +
  '</div>' +
  '</div>' + modalEdit() + '</html>');
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
    files(dm + folder, resp, "", false);
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
app.get("/openimage", function (req, resp) {
  if(req.query.id == null){
    resp.status(500).end("No defined id");
    return;
  }
  let file = decrypt(req.query.id);  
  if(!isImage(file))
  {
    resp.status(500).end("No valid image format");
    return;
  }
  var options = {}; 
  resp.status(200).sendFile(file, options, (err) => {
      if(err)
          console.log(err)
  });
  
});
app.get("/openvideo", function (req, resp) {
  if(req.query.id == null){
    resp.status(500).end("No defined id");
    return;
  }
  let file = decrypt(req.query.id);  
  if(!isVideo(file))
  {
    resp.status(500).end("No valid video format");
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
        files(file, resp, mdir, public_files.includes(req.query.id))
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
  if(!req.query.token || !validate(req.query.token)) {
    res.status(403).send("Unauthorized");
    return;
  }
  try {
      let count = 0;
      let counti = 0;
      req.pipe(req.busboy);        
      req.busboy.on('field', (name, val, info) => {
        if(name == 'count')
          count = parseInt(val);
      });  
      req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`Upload of '${filename}' started`);        
        let p = decrypt(req.query.path);              
        const fstream = fs.createWriteStream(path.join(p, filename));
        file.pipe(fstream);
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished`);                     
        });
        fstream.on('finish', () => { 
          counti++;
          console.log(`Uploaded ${counti} of ${count} files`);
          if(counti >= count && count > 0)           
          {
            count = 0;
            counti = 0;
            res.redirect('back');
          }
        });
      });
      req.busboy.on('finish', () => {
        if(count === 0) {
          res.redirect('back');
        }
      });
  } catch (err) {
      console.error('Upload error:', err);
      res.status(500).send(err.toString());
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
  console.log(new Date().toDateString());
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
let viewButton = (target, name) => {
  const id = encrypt(target)
  return '<a class=iview title="View" href="#" onclick="openImageModal(\'' + encodeURIComponent(name) + '\', \'' + id + '\'); return false;"></a>'
}
let viewVideoButton = (target, name) => {
  const id = encrypt(target)
  return '<a class=ivideo title="Play Video" href="#" onclick="openVideoModal(\'' + encodeURIComponent(name) + '\', \'' + id + '\'); return false;"></a>'
}
let isImage = (filename) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return imageExtensions.includes(ext);
}
let isVideo = (filename) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.swf'];
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return videoExtensions.includes(ext);
}

let persist = () =>{
  fs.writeFile('public.txt',JSON.stringify(decryptArray(public_files)), (err) => {
    if(err)
      console.log(err)    
  })
}
let modalEdit = () => 
{
  return `
  <div id="modale" class="modal modal-fixed-footer" style="background: #1a1a2e; border-radius: 16px;">
    <div class="modal-content" style="background: #1a1a2e;">
      <h4 id="modal_title" style="color: #00d9ff; margin-bottom: 20px;"></h4>
      <textarea id="modal_content" style="height: 500px; width: 100%; background: #16213e; color: #e0e0e0; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 15px; font-family: 'Courier New', monospace; font-size: 14px;"></textarea>
    </div>
    <div class="modal-footer" style="background: #16213e; padding: 16px 24px;">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" style="color: #e0e0e0; margin-right: 10px;">Cancel</a>
      <a href="#!" id="save" class="modal-close waves-effect waves-green btn-flat" style="background: linear-gradient(135deg, #11998e, #38ef7d); color: #fff; padding: 8px 24px; border-radius: 8px;">Save</a>
    </div>
  </div>
  <div id="imageModal" class="modal" style="background: rgba(26, 26, 46, 0.95); border-radius: 16px;">
    <div class="modal-content" style="text-align: center; padding: 20px; background: transparent;">
      <h4 id="imageModalTitle" style="color: #00d9ff; margin-bottom: 20px;"></h4>
      <img id="imagePreview" style="max-width: 100%; max-height: 70vh; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" />
    </div>
    <div class="modal-footer" style="background: #16213e; padding: 16px 24px;">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" style="background: rgba(255,255,255,0.1); color: #fff; padding: 8px 24px; border-radius: 8px;">Close</a>
    </div>
  </div>
  <div id="videoModal" class="modal modal-fixed-footer" style="background: rgba(26, 26, 46, 0.95); border-radius: 16px;">
    <div class="modal-content" style="text-align: center; padding: 20px; max-height: 90vh; background: transparent;">
      <h4 id="videoModalTitle" style="color: #00d9ff; margin-bottom: 20px;"></h4>
      <video id="videoPlayer" controls style="max-width: 100%; max-height: 70vh; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="modal-footer" style="background: #16213e; padding: 16px 24px;">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" style="background: rgba(255,255,255,0.1); color: #fff; padding: 8px 24px; border-radius: 8px;">Close</a>
    </div>
  </div>`;
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
