/** MAIN */ 
 
const express = require('express'); 
const app = express();  
var fs = require('fs');

//INIT .ENV VAR
if(!process || !process.env || !process.env.TOKEN){
    require('dotenv').config();
}

var port = process.env.PORT || 8080;
var token = process.env.TOKEN || '';

app.use(express.static(__dirname + '/dist/'));

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

const http = require('http').Server(app); 


//START LISTENING FOR CHANNEL CHANGE
const io = require('socket.io')(http); 
 
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
