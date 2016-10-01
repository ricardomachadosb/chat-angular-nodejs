var path = require('path');


module.exports = function(app) {
  var ChatController = {

    index: function(req, res){
       res.sendFile(path.resolve(__dirname + '/../public/views/index.html'));
    }

  };

  return ChatController;
}
