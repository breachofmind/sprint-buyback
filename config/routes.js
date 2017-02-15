var path = require('path');

module.exports.routes = {
    middleware: [
        'Static',
        'Init',
        'ConsoleLogging',
        'BodyParser',
        'Localization',
        'Session',
    ],
    paths: [
        {
            "GET /": "IndexController.index",
            "POST /device/serial" : "StateController.serial",
            "POST /device/quote" : "StateController.quote",
        }
    ],
    error: "NotFound",
    static: {
        "/" : path.resolve(__dirname, "../public")
    }
};