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
app.use('/src/assets', express.static(__dirname + '/src/assets/'));

app.get("/", (request, response) => { 
    response.sendFile('home.html' , { root: './src/resource/html/' })
});  
app.get("/favicon.ico", (request, response) => { 
    response.sendFile('favicon.ico' , { root: './src/resource/' })
});  

var files = fs.readdirSync('./src/resource/html/');
files.forEach(file => { 
    var streetaddress= file.substr(0, file.indexOf('.')); 
    app.get("/"+streetaddress, (request, response) => { 
        response.sendFile(file , { root: './src/resource/html/' }) 
    });  
});
var filesCss = fs.readdirSync('./src/resource/css/');
filesCss.forEach(file => {  
    console.log("/src/resource/css/"+file);
    app.get("/src/resource/css/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/css/' }) 
    });  
});
var filesJs = fs.readdirSync('./src/resource/js/');
filesJs.forEach(file => {  
    console.log("/src/resource/js/"+file);
    app.get("/src/resource/js/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/js/' }) 
    });  
});
var filesHome = fs.readdirSync('./src/resource/home');
filesHome.forEach(file => {  
    console.log("/src/resource/html/home/"+file);
    app.get("/src/resource/html/home/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/home/' }) 
    });  
});
 

   
const http = require('http').Server(app); 
  
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
