/**
 * Environment Configuration.
 * @type {{}}
 */
module.exports = {

    env: ENV_LOCAL,

    url: "http://localhost",

    port: 8860,

    proxy: undefined,

    /**
     * The database credentials.
     * @type Object
     */
    db: {
        driver: require('expressway/src/drivers/MongooseDriver'),
        hostname: "localhost",
        database: "sprintbbti",
        username: null,
        password: null
    },

    debug: true,

    nodemailer_transport: null,
};