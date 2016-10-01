module.exports = function(app){

	var connectResponse = function(socket, io){
		socket.on('new order', function(order){
			io.emit('new order', order);
		});

		socket.on('delete order', function(order){
			io.emit('delete order', order);
		});

		socket.on('update order', function(order){
			io.emit('update order', order);
		});
	}

	return {
		connectResponse: connectResponse
	}

}
