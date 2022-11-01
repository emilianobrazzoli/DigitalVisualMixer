/** MAIN */ 
  
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchChannel, saveChannel }  from './manager.js' 
import { createServer } from "http";
import { Server } from "socket.io";


//INIT ENV VAR
const app = express();  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const http = createServer(app);
const io = new Server(http);
if(!process || !process.env || !process.env.TOKEN){
    dotenv.config();
}
var port = process.env.PORT || 8080;
var token = process.env.TOKEN || '';
app.use(express.static(__dirname + '/dist/'));

//LOAD MODULE  

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
app.get("/dist/bootstrap.min.css.map", (request, response) => { 
    response.sendFile('bootstrap.min.css.map' , { root: './node_modules/bootstrap/dist/css/' }) 
});  

var themeCss = fs.readdirSync('./node_modules/codemirror/theme');
themeCss.forEach(file => {   
    app.get("/theme/"+file, (request, response) => { 
        response.sendFile(file , { root: './node_modules/codemirror/theme/' }) 
    });  
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
var channelShow =  1; //default
var toload = true; //default

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    console.log("app: init connection");
 
    io.sockets.emit("get_channel", searchChannel(channelShow));  

    io.sockets.emit("get_toload", toload);  

    //set the channel in charge
    socket.on('set_channel', function(variable) {
        console.log("app: set_channel to show "+variable);
        channelShow = variable;
        socket.broadcast.emit('set_channel', searchChannel(channelShow));
    });

    //set to load a content
    socket.on('set_toload', function(variable) {
        console.log("app: set_toload "+variable);
        toload = variable;
        socket.broadcast.emit('set_toload', variable);
    });

    //save to db the code of a channel changed
    socket.on('save_channel', function(variable) {
        console.log("app: save_channel "+variable.id);
        saveChannel(variable);
    });
    
    //return the code of a channel
    socket.on('get_code', function(variable) { 
        console.log("app: get_code "+variable);
        var code = searchChannel(variable).code;
        socket.emit('get_code', code);
    });

});  

//ASCOLTA LA PORTA localhost per dire che il progetto è attivo
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
