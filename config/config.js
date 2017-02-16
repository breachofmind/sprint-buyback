var path = require('path');

/**
 * Main configuration file for the application.
 * @param system {object}
 */
module.exports = {

    root: require('../app/App'),

    /**
     * Classes to use in the application.
     * @type Array<Function>
     */
    use: [
        require('expressway-dev'),
        require('expressway-rest'),
        require('expressway/src/providers'),
        require('expressway/src/middlewares'),
        require('expressway-auth/src/models/User'),
        require('../app/models/Device'),
        require('../app/controllers/IndexController'),
        require('../app/controllers/StateController'),
    ],

    /**
     * Livereload settings.
     * @type Object
     */
    livereload: {
        watch: [
            path.resolve(__dirname, "../public/"),
            path.resolve(__dirname, "../resources/views/"),
        ],
    },

    /**
     * The unique application key.
     * @type string
     */
    appKey: "ry72Ycj_l",


    /**
     * Limit of records to return in the API.
     * @type number
     */
    limit: 10000,

    /**
     * View engine used by Express.
     * @type string ejs|pug|jade|hbs...
     */
    view_engine: "htm",

    /**
     * Supported languages.
     * @type array<string>
     */
    locales: ['en','en_us'],

    /**
     * Paths to files.
     * @type {Object}
     */
    paths: {
        tmp:         "./tmp",
        logs:        "./tmp/logs",
        views:       "./resources/views",
        locales:     "./resources/locale",
        resources:   "./resources",
        config:      "./config",
        models:      "./app/models",
        controllers: "./app/controllers",
        middleware:  "./app/middlewares",
        providers:   "./app/providers",
        services:    "./app/services",
        components:  "./app/components",
        uploads:     "./public/uploads",
        public:      "./public",
        db:          "./app/db",
    },

    /**
     * When using ConsoleLogging middleware, prints the log in a nice way.
     * @type {Boolean}
     */
    pretty_logging: false,

    /**
     * Transport to use for nodemailer. By default, uses nodemailer-transport-stub.
     * @example smtps://postmaster@MAILGUN_SANDBOX.mailgun.org:SMTP_PASSWORD@smtp.mailgun.org
     * @type {Transport|string|null}
     */
    nodemailer_transport: null,

    /**
     * A custom debugging function.
     * @injectable
     * @type Function
     */
    debugger: require('expressway/src/support/debugger'),
}