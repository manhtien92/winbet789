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
var adminList = sharedObj.adminList;
var userCount = sharedObj.userCount;
app.use(express.static(__dirname + '/bower_components'));


app.get('/', function (req, res) {
    console.log('da ket noi');
    res.send('Hello World!');
});
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    res.send('Hello sicret!');
});



/*
 -----------------------------------------
 GLOBAL AREA
 -----------------------------------------
 */
io.sockets.on('connection',function(socket){
    userCount++;
    console.log( 'Get new connection from client - CCU:' + userCount);
    socket.on('disconnect', function(){
        userCount--;
        console.log( 'A client has closed connection - CCU:' + userCount);
    });
    socket.on('error', function(){
        userCount--;
        console.log( 'Client has a error connection - CCU:' + userCount);
    });
});
/*
 -----------------------------------------
 ADMIN AREA
 -----------------------------------------
 */

io.of('/admin_area').on('connection', function(socket) {

});
/*
 -----------------------------------------
 MEMBERS AREA
 -----------------------------------------
 */
io.of('/member_area').on('connection', function(socket) {
    var newMember = new Object();
    newMember.socket = socket;
    newMember.user = '';
    newMember.session = '';

    // Created list logged member
    memberList.push(newMember);
    socket.on('message', function(jsonObject){
        switch(jsonObject['msgtype']) {
            case 'clientConnect':
                socket.emit('message', {msgtype: 'clientConnect', msg:'Hello', socketid: socket.id});
                break;
            case 'check_logged':
                console.log(userList);
                var user = jsonObject['user'];
                var session = jsonObject['session'];
                var mSize = userList.length - 1;
                for (var i = mSize; i >= 0; i--) {
                    // If find session in nodejs, set connection for client
                    if (userList[i].user == user && userList[i].session == session) {
                        var memCount = memberList.length - 1;
                        for (var j = memCount; j >= 0; j--) {
                            if (memberList[j].socket == socket) {
                                // Set connection for client
                                memberList[j].user = user;
                                memberList[j].session = session;
                                messResult = {msgtype: 'logged_result', result: true, user: userList[i].user};
                                // Emit message to client
                                socket.emit("message", messResult);
                                return;
                            }
                        }
                    }
                }
                messResult = {msgtype: 'logged_result', result: false, 'user': '', userlist: userList};
                socket.emit("message", messResult);
                break;
        //    // Login event
            case 'memberlg':
console.log('log', userList);
                var messResult;
                var mSize = userList.length - 1;
                var user = jsonObject.user;
                var userFound = false;
                for (var i = mSize; i >= 0; i--) {
                    if (user != '' || user != null) {
                        //Check if duplicate login
                        if (userList[i].session != jsonObject.session) {
                            var msgLoginDup = {msgtype : 'duplicate_login'};
                            var memCount = memberList.length - 1;
                            for (var j = memCount; j >= 0; j--) {
                                if (memberList[j].user == user) {
                                    memberList[j].user = '';
                                    memberList[j].session = '';
                                    memberList[j].socket.emit('message', msgLoginDup);
                                }
                            }
                            userList[i].session = jsonObject.session;

                        }
                        var memCount = memberList.length - 1;
                        for (var j = memCount; j >= 0; j--) {
                            if (memberList[j].socket == socket) {
                                memberList[j].user = user;
                                memberList[j].sessionid = jsonObject.session;
                                break;
                            }
                        }
                        messResult = {
                            msgtype: 'login_result',
                            result: true,
                            user: user
                        };

                        socket.emit("message", messResult);
                        userFound = true;
                        return;
                    }
                }
                // If not found in userlist, update connection to userlist and memberlist
                if (userFound) break;

                var memCount = memberList.length - 1;
                for (var j = memCount; j >= 0; j--) {
                    if (memberList[j].socket == socket) {
                        memberList[j].user = jsonObject.user;
                        memberList[j].sessionid = jsonObject.session;
                        break;
                    }
                }
                // Update to userlist
                var user = new Object();
                user.user = jsonObject.user;
                user.session = jsonObject.session;
                userList.push(user);
                console.log('user', userList);
                messResult = {
                    msgtype : 'login_result',
                    result : true,
                    user : user,
                    userlist: userList
                };
                socket.emit("message", messResult);
                console.log('log', userList);
                break;
        //    // Logout event
        }
    });

    socket.on('disconnect', function(){
        var iSize = memberList.length - 1;
        for (var i = iSize; i >= 0; i--){
            if(memberList[i].socket == socket){
                memberList.splice(i, 1);
                break;
            }
        }
    });
});



//io.on('connection', function(client) {
//    console.log('Client connected...');
//
//    client.on('agMsg', function(data) {
//        console.log(data);
//    });
//    client.on('memberMsg', function(data) {
////console.log(data);
//        switch (data.msgType)
//        {
//            case 'clientConnect':
//            {
//                var newMember = new Object();
//                newMember.socket = client;
//                newMember.user = '';
//                newMember.sessionid = '';
//                // Created list logged member
//                memberList.push(newMember);
//                console.log(data.msg + ' '+ memberList.length);
//
//            }
//                break;
//            case 'memberlg':
//            {
//                console.log(userList)
//                var mSize = userList.length - 1;
//                var user = data.user;
//                var password = data.password;
//                var found = false;
//                for(var i = mSize; i >= 0; i--){
//                    var userList[i] = userList[i];
//                    if(userList[i].user == data.user && userList[i].password == data.password){
//                        //Check if duplicate login
//                        //console.log(data);
//                        if(userList[i].session != data.session) {
//
//                            var msgLoginDup = "{msgType : 'duplicate_login'}";
//                            var memCount = memberList.length - 1;
//                            for (var j = memCount; j >= 0; j--) {
//                                if (memberList[j].user == user) {
//                                    memberList[j].user = '';
//                                    memberList[j].session = '';
//                                    memberList[j].socket.emit('message', msgLoginDup);
//                                }
//                            }
//                            userList[i].session = data.session;
//                        }
//                        var memCount = memberList.length - 1;
//                        for(var j = memCount; j >= 0; j--){
//                            if(memberList[j].socket == client){
//                                memberList[j].user = user;
//                                memberList[j].session = data.session;
//                                break;
//                            }
//                        }
//                        found = true;console.log('--'+found);
//                        return;
//                    }
//                }
//                if(found) break;
//                // neu khong thấy , tạo mới
//                var memCount = memberList.length - 1;
//                for(var j = memCount; j >= 0; j--){
//                    if(memberList[j].socket == client){
//                        memberList[j].user = user;
//                        memberList[j].session = data.session;
//                        break;
//                    }
//                }
//                // Update to userlist
//                var user = new Object();
//                user.user = user;
//                user.password = password;
//                user.session = data.session;
//                userList.push(user);
//
//            }
//                break;
//        }
//
//    });
//    client.on('disconnect', function(){
//        var iSize = memberList.length - 1;
//        for (var i = iSize; i >= 0; i--){
//            if(memberList[i].socket == client){
//                memberList.splice(i, 1);
//                break;
//            }
//        }
//    });
//});

server.listen(1888, function () {
    console.log('Listening on port 1888!');
});
;
