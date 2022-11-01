/** MANEGGIA I DATI DA SALVARE */
import { existsSync, writeFileSync, writeFile } from 'fs';  
import db from './resource/db.json'; 
var pathWrite = './src/resource/db.json';      

var flush = function(sampleObject){
    writeFile(pathWrite, JSON.stringify(sampleObject), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Flush with success!");
    });
} 
var saveChannel = function(channelToSave){
    var found = false; 
    db.channel.forEach(channel => {
        if(channel.id === channelToSave.id){
            channel = channelToSave;
            found = true; 
        }
    });
    if(!found){
        db.channel.push(channelToSave);
    } 
    flush(db);
} 
var searchChannel = function(channelID){
    var found = false; 
    var channelToFind = {
        id: channelID,
        code: ''
    };
    db.channel.forEach(channel => {
        if(channel.id === channelToFind.id){
            channelToFind = channel;
            found = true; 
        }
    });
    if(!found){
        saveChannel(channelToFind);
    }
    return channelToFind;
}


export { searchChannel, saveChannel } 