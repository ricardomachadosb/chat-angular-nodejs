module.exports = function(app) {
    var chatController = app.controllers.chatController;

    app.get("/", chatController.index);
}
