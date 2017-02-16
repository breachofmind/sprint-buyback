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

    deploy: {
        host: "dev.brightstarus.com",
        username: "madamczyk-adm",
        privateKey: "/Users/ma18250/.ssh/id_rsa",
        path: "/var/www/html/sprint-buyback"
    }
};