var fs = require('fs'), http = require('http'), WebSocket = require('ws');

if (process.argv.length < 3) {
	console.log('输入正确参数');
	process.exit();
}

var stream_secret = process.argv[2];//密码
var stream_port = process.argv[3] || 8081;//ffpeng推送端口
var websocket_port = process.argv[4] || 8082;//前端websocket端口 ，比如：8082
var record_stream = false;
var totalSize = 0;

function initWebSocket(websocket_port) {
	var clientMap = new Map();//缓存，实现多个视频流同时播放的问题
	
	var socketServer = new WebSocket.Server({
		port : websocket_port,
		perMessageDeflate : false
	});
	socketServer.on('connection', function(socket, upgradeReq) {
		var url = upgradeReq.socket.remoteAddress + upgradeReq.url;
		var key = url.substr(1).split('/')[1];//key就是通过url传递过来的标识比如:(ws://127.0.0.1:8082/live3)其中live3就是这个标识，其他的流可随机生成其他的字符串
		var clients = clientMap.get(key);
		if(!clients){
			clients = new Set();
			clientMap.set(key,clients);
		}
		clients.add(socket);
		totalSize++;
		process.stdout.write("[INFO]:a new connection, the current number of connections: " + totalSize + ".\r");
		socket.on('close', function(code, message) {
			var clientSet = clientMap.get(key);
			if(clientSet){
				clientSet.delete(socket);
				totalSize--;
				if(clientSet.size == 0){
					clientMap.delete(key);
				}
			}
			process.stdout.write("[INFO]:close a connection, the current number of connections:" + totalSize + ".\r");
		});
		
		
	});

	socketServer.broadcast = function(data, theme) {
		var clients = clientMap.get(theme);
		if (clients) {
			clients.forEach(function (client, set) {
				if(client.readyState === WebSocket.OPEN){
					client.send(data);
				}
			});
		}
	};
	return socketServer;
}

function initHttp(stream_port, stream_secret, record_stream, socketServer) {
	var streamServer = http.createServer(
			function(request, response) {
				var params = request.url.substr(1).split('/');
				if (params.length != 2) {
					process.stdout.write("\n[ERROR]:Incorrect parameters, enter password and push theme");
					response.end();
				}
				if (params[0] !== stream_secret) {
					process.stdout.write("\n[ERROR]:Password error: "+request.socket.remoteAddress+":"+request.socket.remotePort+"");
					response.end();
				}
				response.connection.setTimeout(0);
				request.on('data', function(data) {
					socketServer.broadcast(data, params[1]);
					if (request.socket.recording) {
						request.socket.recording.write(data);
					}
				});
				request.on('end', function() {
					process.stdout.write("\n[INFO]:close request");
					if (request.socket.recording) {
						request.socket.recording.close();
					}
				});
				if (record_stream) {
					var path = 'recordings/' + Date.now() + '.ts';
					request.socket.recording = fs.createWriteStream(path);
				}
			}).listen(stream_port);
			console.log('started rtsp WebSocket service in secret is [%s], service port is [%s], ws port is [%s].',stream_secret,stream_port,websocket_port);
}

initHttp(stream_port, stream_secret, record_stream,
		initWebSocket(websocket_port));
