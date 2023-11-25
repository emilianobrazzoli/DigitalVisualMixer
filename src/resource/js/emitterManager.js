
var socket = io(); 

//RETRIVE CHANNEL IN LIVE
socket.on('get_in_load', function (variable) {
    var element = document.getElementById(variable + "");
    if (element)
        element.classList.add("liveChannel");
    if(channelSelected)
    channelSelected = parseInt(channel);
});


//RETRIVE GETCHANNEL
socket.on('get_channel', function (variable) {
    showChannelLive(variable.id);
});

//RETRIVE CHANNEL BY FIND CHANNEL
socket.on('find_channel', function (variable) {
    var code = variable.code;
    js.getDoc().setValue(code);
    if (loadprev) {
        prev();
        loadprev = false;
    }
    if (!variable.name) {
        variable.name = variable.id;
    }
    document.getElementById('channelName').value = variable.name + "";
});


//RETRIVE CHANNELS BY GET ALL
socket.on('get_all', function (variable) {

    initializeChannel(variable).then(data => {
        autosave();
        emit('get_in_load');
    })
});

function emit(emitter, arg){
    const emitPromise = new Promise((resolve, reject) => {
        if(arg){
            socket.emit(emitter, arg); 

        }else{
            socket.emit(emitter); 
        }
        resolve();
    });
    return emitPromise;
}