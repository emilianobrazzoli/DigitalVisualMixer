/** MAIN */ 
  
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
/*
const http = require('http').Server(app); 
const io = require('socket.io')(http); 
*/
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const http = createServer(app);
const io = new Server(http);

//INIT .ENV VAR
if(!process || !process.env || !process.env.TOKEN){
    dotenv.config();
}

var port = process.env.PORT || 8080;
var token = process.env.TOKEN || '';

app.use(express.static(__dirname + '/dist/'));

//LOAD MODULE                                         node_modules\@codemirror\view\dist 
/*app.get("/scripts/commands/index.js", (request, response) => { 
    response.sendFile('index.js' , { root: './node_modules/@codemirror/commands/dist/' }) 
});  
app.get("/scripts/view/index.js", (request, response) => { 
    response.sendFile('index.js' , { root: './node_modules/@codemirror/view/dist/' }) 
});  */

/*
<script src="lib/codemirror.js"></script>
<link rel="stylesheet" href="lib/codemirror.css">
<script src="mode/javascript/javascript.js"></script>
node_modules\codemirror */

app.get("/mode/javascript/javascript.js", (request, response) => { 
    response.sendFile('javascript.js' , { root: './node_modules/codemirror/mode/javascript/' }) 
});  
app.get("/lib/codemirror.css", (request, response) => { 
    response.sendFile('codemirror.css' , { root: './node_modules/codemirror/lib/' }) 
});  
app.get("/lib/codemirror.js", (request, response) => { 
    response.sendFile('codemirror.js' , { root: './node_modules/codemirror/lib/' }) 
});  
app.get("/dist/bootstrap.min.css", (request, response) => { 
    response.sendFile('bootstrap.min.css' , { root: './node_modules/bootstrap/dist/css/' }) 
});  



//LOAD ASSETS
app.use('/src/assets', express.static(__dirname + '/src/assets/')); 

//LOAD HOMEPAGE ON MAIN LOCALHOST:8080
app.get("/", (request, response) => { 
    response.sendFile('home.html' , { root: './src/resource/html/' }) 
});  

//LOAD FAVICON
app.get("/favicon.ico", (request, response) => { 
    response.sendFile('favicon.ico' , { root: './src/resource/' })
});  

//LOAD ALL HTML AND EXPOSE IT
var files = fs.readdirSync('./src/resource/html/');
files.forEach(file => { 
    var streetaddress= file.substr(0, file.indexOf('.')); 
    app.get("/"+streetaddress, (request, response) => { 
        response.sendFile(file , { root: './src/resource/html/' }) 
    });  
});

//LOAD ALL CSS AND EXPOSE IT
var filesCss = fs.readdirSync('./src/resource/css/');
filesCss.forEach(file => {  
    console.log("/src/resource/css/"+file);
    app.get("/src/resource/css/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/css/' }) 
    });  
});

//LOAD ALL JS AND EXPOSE IT
var filesJs = fs.readdirSync('./src/resource/js/');
filesJs.forEach(file => {  
    console.log("/src/resource/js/"+file);
    app.get("/src/resource/js/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/js/' }) 
    });  
});

 


//START LISTENING FOR CHANNEL CHANGE
var channel =  1; //default
var toload = true; //default

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    console.log("sto connettendo");
 
    io.sockets.emit("get_channel", channel);  

    io.sockets.emit("get_toload", toload);  

    socket.on('set_channel', function(variable) {
        channel = variable;
    });

    socket.on('set_toload', function(variable) {
        toload = variable;
    });
     
});  

//ASCOLTA LA PORTA localhost per dire che il progetto è attivo
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
