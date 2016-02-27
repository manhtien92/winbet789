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
    //var dataReceive;
    var newAdmin = new Object();
    newAdmin.socket = socket;
    newAdmin.userid = '';
    newAdmin.sessionid = '';
    //Created list logged admin
    adminList.push(newAdmin);

    socket.on('message', function (data) {
        var jsonObject;
        try {
            dataReceive = _deData(data);
            jsonObject = eval('(' + dataReceive + ')');
        } catch (e) {
            console.log(getDateTime(), 'Parse json string admin error: ', dataReceive);
            console.log(getDateTime(),jsonObject);
            return;
        }
        var sessionid = Decode(jsonObject['sessId'], cyptKey);
        console.log( jsonObject );
        switch (jsonObject['msgtype']) {
            case 'reset_bonus':
                var memCount = memberList.length - 1;
                var userid = jsonObject['userid'];
                for (var j = memCount; j >= 0; j--) {
                    if (memberList[j].userid == userid)
                        memberList[j].socket.emit("message", data);
                }
                break;
            case 'balance':
                var memCount = memberList.length - 1;
                var userid = jsonObject['id'];
                //console.log('lol',data);
                for (var j = memCount; j >= 0; j--) {
                    if (memberList[j].userid == userid)
                        memberList[j].socket.emit("message", data);
                }
                break;
            // status of account member
            case 'acc_block':
                var memCount = memberList.length - 1;
                var gamesiteCount = gamesiteList.length - 1;
                var useridBlock = jsonObject['userid'];
                for (var j = memCount; j >= 0; j--) {
                    if (memberList[j].userid == useridBlock){
                        memberList[j].socket.emit("message", data);
                    }
                }
                for(var i=gamesiteCount; i>=0; i--){
                    if(gamesiteList[i].game == 'poker'){
                        var data_ = _enData(dataReceive)
                        gamesiteList[i].socket.write(data_);
                    }
                }
                break;
            case 'user_change_pass':
                var gamesiteCount = gamesiteList.length - 1;
                for(var i=gamesiteCount; i>=0; i--){
                    var data_ = _enData(dataReceive)
                    gamesiteList[i].socket.write(data_);
                }
                break;
            case 'adminlg':
                // DECODE
                var messResult;
                var userCount = userList.length - 1;
                var userid = Decode(jsonObject['usr'], cyptKey);
                var pass = Decode(jsonObject['pwd'], cyptKey);
                var userFound = false;
                for (var i = userCount; i >= 0; i--) {
                    var currUser = userList[i];
                    if (currUser.id == userid && currUser.password == pass) {
                        //Check if duplicate login
                        var msgLoginDup = "{msgtype : 'duplicate_login'}";
                        msgLoginDup = _enData(msgLoginDup);
                        if (currUser.sessionid != sessionid) {
                            var adminCount = adminList.length - 1;
                            for (var j = adminCount; j >= 0; j--) {
                                if (adminList[j].userid == userid) {
                                    adminList[j].userid = '';
                                    adminList[j].sessionid = '';
                                    adminList[j].socket.emit('message', msgLoginDup);
                                }
                            }
                            currUser.sessionid = sessionid;
                        }
                        var adminCount = adminList.length - 1;
                        for (var j = adminCount; j >= 0; j--) {
                            if (adminList[j].socket == socket) {
                                adminList[j].userid = userid;
                                adminList[j].sessionid = sessionid;
                                break;
                            }
                        }
                        messResult = "{msgtype : 'login_result', result : true, username : '" + userList[i]['id'] + "' , level : '" + userList[i].level + "' , pwd : '" + userList[i].password + "'}";
                        var data = _enData(messResult);
                        socket.emit("message", data);
                        userFound = true;
                        return;
                    }
                }
                // If not found in userlist, update connection to userlist and memberlist
                if (userFound) break;
                console.log("Continue check if user existing in DB");
                dbcnn = mysql.createConnection({host: '127.0.0.1', user: 'root', password: '', database: 'lobby'});
                var qString = "SELECT userid, password, session_id, level, email FROM users WHERE `userid` = '" + userid + "' AND `password` = '" + pass + "'";
                var query = dbcnn.query(qString, function (err, results, fields) {
                    if(err) {console.log('Check existing user fail, Can not connect to database lobby!'); dbcnn.end(); return;}
                    if (results.length > 0) {
                        var newUser = new Object();
                        newUser.id = results['userid'];
                        newUser.password = results['password'];
                        newUser.sessionid = results['session_id'];
                        newUser.level = results['level'];
                        newUser.email = results['email'];
                        userList.push(newUser);
                        // Update connection to memberlist
                        var adminCount = adminList.length - 1;
                        for (var j = adminCount; j > 0; j--) {
                            if (adminList[j].socket == socket) {
                                adminList[j].userid = newUser.id;
                                adminList[j].sessionid = sessionid;
                                break;
                            }
                        }
                        messResult = "{msgtype : 'login_result', result : true, username : '" + results[0]['userid'] + "' , level : '" + results[0]['level'] + "'}";
                        var data = _enData(messResult);
                        socket.emit("message", data);
                    } else {
                        messResult = "{msgtype : 'login_result', result : false, username : ''}";
                        var data = _enData(messResult);
                        socket.emit("message", data);
                    }
                    dbcnn.end();
                });
                break;
            case 'transfer_reply':
                var memCount = memberList.length - 1;
                var gamesiteCount = gamesiteList.length - 1;
                var userid = jsonObject['userid'];
                for (var i = memCount; i >= 0; i--) {
                    if (memberList[i].userid == userid) {
                        memberList[i].socket.emit('message', data);
                    }
                }
                for(var i=gamesiteCount; i>=0; i--){
                    if(gamesiteList[i].game == jsonObject['gametype']){
                        //console.log(dataReceive);
                        var data_ = _enData(dataReceive)
                        gamesiteList[i].socket.write(data_);
                    }
                }
                break;
            case 'transaction_management_rabat':
                socket.broadcast.emit('message', data);
                break;
            case 'mailbox_management':
                socket.broadcast.emit('message', data);
                break;
            case 'system_config_general':
                socket.broadcast.emit('message', data);
                break;
            case 'system_config_bonus_promotion':
                socket.broadcast.emit('message', data);
                break;
            case 'system_config_game_edit':
                socket.broadcast.emit('message', data);
                break;
            case 'transaction_limit_change':
                socket.broadcast.emit('message', data);
                break;
            case 'system_config_message':
                socket.broadcast.emit('message', data);
                break;
            case 'contact_management':
                socket.broadcast.emit('message', data);
                break;
            case 'user_complete_register':
                socket.broadcast.emit('message', data);
                break;
            case 'realtime_admin':
                socket.broadcast.emit('message', data);
                break;
            case 'withdraw_reply':
                var memCount = memberList.length - 1;
                var userid = jsonObject['userid'];
                for (var i = memCount; i >= 0; i--) {
                    if (memberList[i].userid == userid) {
                        memberList[i].socket.emit('message', data);
                    }
                }
                break;
            case 'deposit_reply':
                var memCount = memberList.length - 1;
                var gamesiteCount = gamesiteList.length - 1;
                var userid = jsonObject['userid'];
                for (var i = memCount; i >= 0; i--) {
                    if (memberList[i].userid == userid){
                        memberList[i].socket.emit('message', data);
                        for(var i=gamesiteCount; i>=0; i--){
                            if(gamesiteList[i].game == jsonObject['gametype']){
                                var data_ = _enData(dataReceive)
                                gamesiteList[i].socket.write(data_);
                            }
                            break;
                        }
                    }
                }
                break;
            case 'send_mail':
                var userReceive = jsonObject['userReceive'].split(',');
                var memCount = memberList.length - 1;
                for (var j = memCount; j >= 0; j--) {
                    for (var i = 0; i < userReceive.length; i++) {
                        var msg = "{msgtype : 'send_mail', usrSend : '" + jsonObject['usrSend'] + "', userReceive:'" + userReceive[i] + "', title: '" + jsonObject['title'] + "', datetime: '" + jsonObject['datetime'] + "', mailid: '" + jsonObject['mailid'] + "'}";
                        msg = _enData(msg);
                        if (memberList[j].userid == userReceive[i]) {
                            memberList[j].socket.emit('message', msg);
                            userReceive.splice(i, 1);
                        }
                        io.of('/admin_area').emit('message', msg);
                    }
                }
                break;
            case 'reply_mail':
                var memCount = memberList.length - 1;
                for (var j = memCount; j >= 0; j--) {
                    if (memberList[j].userid == jsonObject['userReceive']) {
                        memberList[j].socket.emit('message', data);
                    }
                }
                socket.broadcast.emit('message', data);
                break;
            case 'rabat_reply':
                var memCount = memberList.length - 1;
                for (var j = memCount; j >= 0; j--) {
                    if (memberList[j].userid == jsonObject['userReceive']) {
                        memberList[j].socket.emit('message', data);
                    }
                }
                socket.broadcast.emit('message', data);
                break;
            case 'insert_account_gamesite':
                var userid = Decode(jsonObject['userid'], cyptKey);
                var pass = Decode(jsonObject['pass'], cyptKey);
                var msg = "{msgtype : 'insert_account_gamesite', userid : '" + userid + "', pass:'" + pass + "'}";
                msg = CryptoJS.AES.encrypt(msg, key);
                msg = msg.toString(CryptoJS.Utf8);
                var gameCount = gamesiteList.length - 1;
                for(var j = gameCount; j >= 0; j--)
                    gamesiteList[j].socket.write(msg);
                break;
            case 'sync_user_gamesite':
                //console.log('123',jsonObject);
                if(jsonObject['gamesite'] == 'lobby'){
                    var userid = Decode(jsonObject['userid'], cyptKey);
                    var pass = Decode(jsonObject['pass'], cyptKey);
                    var newUser = new Object();
                    newUser.id = userid;
                    newUser.password = pass;
                    newUser.sessionid = '';
                    newUser.level = jsonObject['level'];
                    newUser.email = jsonObject['email'];
                    userList.push(newUser);
                    //console.log(userList)
                }else{
                    var userid = Decode(jsonObject['userid'], cyptKey);
                    var pass = Decode(jsonObject['pass'], cyptKey);
                    var msg = "{msgtype : 'sync_user_gamesite', userid : '" + userid + "', pass:'" + pass + "', gamesite: '"+jsonObject['gamesite']+"', level:'"+jsonObject['level']+"'}";
                    msg = CryptoJS.AES.encrypt(msg, key);
                    msg = msg.toString(CryptoJS.Utf8);
                    var gameCount = gamesiteList.length - 1;
                    for(var j = gameCount; j >= 0; j--)
                        gamesiteList[j].socket.write(msg);
                }
                break;
            case 'search_member':
                var data1 = 'offline';
                for (var i = memberList.length-1; i >-1; i--) {

                    if (jsonObject['username'] == memberList[i].userid) {
                        data1 = 'online'
                        //console.log('holele');
                    }
                }
                var data2 = "{msgtype: 'search_member', status: '"+data1+"'}";
                data2 = _enData(data2);
                socket.emit("message", data2);
                break;
            case 'announcement':
                console.log('123', jsonObject);
                var isAdminLogin = false;
                var adminCount = adminList.length - 1;
                for(var i = adminCount; i >= 0; i--){
                    if(adminList[i].socket == socket && adminList[i].userid.length > 0 && adminList[i].sessionid.length > 0){
                        isAdminLogin = true;
                        break;
                    }
                }
                //Return if agent current not login
                if(!isAdminLogin)
                    return;
                var memberCount = memberList.length - 1;

                if(jsonObject['type'] == '1'){
                    //agent and member
                    for(var i = adminCount; i >= 0; i--){
                        adminList[i].socket.emit('message', data);
                    }
                    for(var i = memberCount; i >= 0; i--){
                        memberList[i].socket.emit('message', data);
                    }
                }else if(jsonObject['type'] == '2'){
                    if(jsonObject['to'] == '1'){
                        //agent
                        for(var i = adminCount; i >= 0; i--){
                            adminList[i].socket.emit('message', data);
                        }
                    }else if(jsonObject['to'] == '2'){
                        //member
                        for(var i = memberCount; i >= 0; i--){
                            memberList[i].socket.emit('message', data);
                        }
                    }else if(jsonObject['to'] == '3'){
                        //agent and member
                        for(var i = adminCount; i >= 0; i--){
                            adminList[i].socket.emit('message', data);
                        }
                        for(var i = memberCount; i >= 0; i--){
                            memberList[i].socket.emit('message', data);
                        }
                    }
                }else if(jsonObject['type'] == '3'){
                    var conti_ = true;
                    for(var i = adminCount; i >= 0; i--){
                        if(adminList[i].userid == jsonObject['to']){
                            adminList[i].socket.emit('message', data);
                            conti_ = false;
                            return false;
                        }
                    }
                    if(conti_){
                        for(var i = memberCount; i >= 0; i--){
                            if(memberList[i].userid == jsonObject['to']){
                                memberList[i].socket.emit('message', data);
                                return false;
                            }
                        }
                    }
                }
                break;
        }
    });
});
/*
 -----------------------------------------
 MEMBERS AREA
 -----------------------------------------
 */
io.of('/member_area').on('connection', function(socket) {
    var dataReceive;
    var newMember = new Object();
    newMember.socket = socket;
    newMember.userid = '';
    newMember.sessionid = '';
    // Created list logged member
    memberList.push(newMember);
    socket.on('message', function(data){
        var jsonObject = data;
        var mSize = memberList.length - 1;


        switch(jsonObject['msgtype']){
            case 'check_logged':
                var email 		= jsonObject['email'];
                var sessionid =jsonObject['session'];
                var mSize = userList.length - 1;
                for(var i = mSize; i >= 0; i--){
                    var currUser = userList[i];
                    // If find session in nodejs, set connection for client
                    if(currUser.email == email && currUser.sessionid == sessionid){
                        var memCount = memberList.length - 1;
                        for(var j = memCount; j >= 0; j--){
                            if(memberList[j].socket == socket){
                                // Set connection for client
                                memberList[j].email = email;
                                memberList[j].sessionid = sessionid;
                                messResult = "{msgtype : 'logged_result', result : true, email : '"+userList[i].email+"}";
                                // Emit message to client
                                socket.emit("message", data);
                                return;
                            }
                        }
                    }
                }
                messResult = "{msgtype : 'logged_result', result : false, email : ''}";
                var data = messResult;
                socket.emit("message", data);
                break;
            // Login event
            case 'memberlg':
                console.log('login');
                //var messResult;
                //var mSize = userList.length - 1;
                //var userid 		= Decode(jsonObject['usr'], cyptKey);
                //var pass 		= Decode(jsonObject['pwd'], cyptKey);
                //var userFound = false;
                //for(var i = mSize; i >= 0; i--){
                //    var currUser = userList[i];
                //    if(currUser.id == userid && currUser.password == pass){console.log(currUser.sessionid + "+++++" + sessionid);
                //        //Check if duplicate login
                //        if(currUser.sessionid != sessionid){console.log(currUser.sessionid + "----" + sessionid);
                //            var msgLoginDup = "{msgtype : 'duplicate_login'}";
                //            msgLoginDup = _enData(msgLoginDup);
                //            var memCount = memberList.length - 1;
                //            for(var j = memCount; j >= 0; j--){
                //                if(memberList[j].userid == userid){
                //                    memberList[j].userid = '';
                //                    memberList[j].sessionid = '';
                //                    memberList[j].socket.emit('message', msgLoginDup);
                //                }
                //            }
                //            currUser.sessionid = sessionid;
                //        }
                //        var memCount = memberList.length - 1;
                //        for(var j = memCount; j >= 0; j--){
                //            if(memberList[j].socket == socket){
                //                memberList[j].userid = userid;
                //                memberList[j].sessionid = sessionid;
                //                break;
                //            }
                //        }
                //        messResult = "{msgtype : 'login_result', result : true, username : '"+userList[i].id+"' , level : "+userList[i].level+"}";
                //        var data = _enData(messResult);
                //        socket.emit("message", data);
                //        userFound = true;
                //        return;
                //    }
                //}
                //// If not found in userlist, update connection to userlist and memberlist
                //if(userFound) break;
                //dbcnn = mysql.createConnection({host: '127.0.0.1', user: 'root', password: '', database: 'lobby'});
                //var qString = "SELECT userid, password, session_id, level, email FROM users WHERE `userid` = '"+userid+"' AND `password` = '"+pass+"'";
                //var query = dbcnn.query(qString, function (err, results, fields) {
                //    if(err) {console.log('Check existing user fail, Can not connect to database lobby!'); dbcnn.end(); return;}
                //    if(results.length > 0 ){
                //        // Update connection to memberlist
                //        var memCount = memberList.length - 1;
                //        for(var j = memCount; j >= 0; j--){
                //            if(memberList[j].socket == socket){
                //                memberList[j].userid = results[0]['userid'];
                //                memberList[j].sessionid = sessionid;
                //                break;
                //            }
                //        }
                //        // Update to userlist
                //        var user = new Object();
                //        user.id = results[0]['userid'];
                //        user.password = results[0]['password'];
                //        user.sessionid = sessionid;
                //        userList.push(user);
                //        messResult = "{msgtype : 'login_result', result : true, username : '"+results[0]['userid']+"' , level : "+results[0]['level']+"}";
                //        var data = _enData(messResult);
                //        socket.emit("message", data);
                //    }else{
                //        messResult = "{msgtype : 'login_result', result : false, username : ''}";
                //        var data = _enData(messResult);
                //        socket.emit("message", data);
                //    }
                //    dbcnn.end();
                //});
                break;
            // Logout event
            case 'memberlgout':
                var sessionid 	= Decode(jsonObject['sessId'], cyptKey);
                var userid		= Decode(jsonObject['usr'], cyptKey);
                var iSize = userList.length - 1;
                for(var i = iSize; i >= 0; i--){
                    var currUser = userList[i];
                    if(currUser.id == userid && currUser.sessionid == sessionid){
                        var msgLogout = "{msgtype : 'logout'}";
                        msgLogout = CryptoJS.AES.encrypt(msgLogout, key);
                        msgLogout = msgLogout.toString(CryptoJS.Utf8);
                        msgLogout = LZString.compressToUTF16(msgLogout);
                        var memCount = memberList.length - 1;
                        for(var j = memCount; j >= 0; j--){
                            if(memberList[j].userid == userid){
                                memberList[j].socket.emit('message', msgLogout);
                                memberList[j].userid = '';
                                memberList[j].sessionid = '';
                            }
                        }
                        var msg = "{msgtype : 'memberLogout', userid : '"+userid+"'}";
                        msg = CryptoJS.AES.encrypt(msg, key);
                        msg = msg.toString(CryptoJS.Utf8);
                        //send msg logout to gamesite
                        var gameCount = gamesiteList.length - 1;
                        for(var j = gameCount; j >= 0; j--)
                            gamesiteList[j].socket.write(msg);
                        currUser.sessionid = '';
                        break;
                    }
                }
                break;
            // Transaction

            default:
                break;
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

    socket.on('error', function() {
        for (var i=0;i<memberList.length;i++){
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
//                newMember.email = '';
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
//                var email = data.email;
//                var password = data.password;
//                var found = false;
//                for(var i = mSize; i >= 0; i--){
//                    var currUser = userList[i];
//                    if(currUser.email == data.email && currUser.password == data.password){
//                        //Check if duplicate login
//                        //console.log(data);
//                        if(currUser.session != data.session) {
//
//                            var msgLoginDup = "{msgType : 'duplicate_login'}";
//                            var memCount = memberList.length - 1;
//                            for (var j = memCount; j >= 0; j--) {
//                                if (memberList[j].email == email) {
//                                    memberList[j].email = '';
//                                    memberList[j].session = '';
//                                    memberList[j].socket.emit('message', msgLoginDup);
//                                }
//                            }
//                            currUser.session = data.session;
//                        }
//                        var memCount = memberList.length - 1;
//                        for(var j = memCount; j >= 0; j--){
//                            if(memberList[j].socket == client){
//                                memberList[j].email = email;
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
//                        memberList[j].email = email;
//                        memberList[j].session = data.session;
//                        break;
//                    }
//                }
//                // Update to userlist
//                var user = new Object();
//                user.email = email;
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
