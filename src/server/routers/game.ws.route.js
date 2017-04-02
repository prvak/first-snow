export default (io) => {
  var nsp = io.of('/my-namespace');
  nsp.on('connection', function(socket){
    console.log('someone connected');
  });
  nsp.emit('hi', 'everyone!');
};
