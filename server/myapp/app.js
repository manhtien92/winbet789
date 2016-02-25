/**
 * Created by lamtanphiho on 2/21/2016.
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sharedObj 	= require('./shared.js');
var memberList = sharedObj.memberList;
var userList = sharedObj.userList;
app.use(express.static(__dirname + '/bower_components'));


app.get('/', function (req, res) {
    console.log('da ket noi');
    res.send('Hello World!');
});
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    res.send('Hello sicret!');
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('agMsg', function(data) {
        console.log(data);
    });
    client.on('memberMsg', function(data) {
        console.log(data.msg);
        switch (data.msgType)
        {
            case 'clientConnect':
            {
                var newMember = new Object();
                newMember.socket = client;
                newMember.email = '';
                newMember.sessionid = '';
                // Created list logged member
                memberList.push(newMember);
            }
                break;
            case 'memberlg':
            {
                var mSize = userList.length - 1;
                for(var i = mSize; i >= 0; i--){
                    var currUser = userList[i];
                    if(currUser.email == data.email && currUser.password == data.password){
                        //Check if duplicate login
                        if(currUser.session != data.session){
                            var msgLoginDup = "{msgtype : 'duplicate_login'}";
                            var memCount = memberList.length - 1;
                            for(var j = memCount; j >= 0; j--){
                                if(memberList[j].email == data.email){
                                    memberList[j].email = '';
                                    memberList[j].session = '';
                                    memberList[j].socket.emit('message', msgLoginDup);
                                }
                            }
                            currUser.session = data.session;
                        }
                        var memCount = memberList.length - 1;
                        for(var j = memCount; j >= 0; j--){
                            if(memberList[j].socket == socket){
                                memberList[j].email = email;
                                memberList[j].session = data.session;
                                break;
                            }
                        }
                        messResult = "{msgtype : 'login_result', result : true, username : '"+userList[i].id+"' , level : "+userList[i].level+"}";
                        var data = _enData(messResult);
                        socket.emit("message", data);
                        return;
                    }
                }
            }
                break;
        }

    });

});
io.on('disconnect', function(){
    var iSize = memberList.length - 1;
    for (var i = iSize; i >= 0; i--){
        if(memberList[i].socket == socket){
            memberList.splice(i, 1);
            break;
        }
    }
});
server.listen(1888, function () {
    console.log('Listening on port 1888!');
});
;
