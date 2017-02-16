"use strict";

var Extension = require('expressway').Extension;
var _ = require('lodash');

/**
 * The Root Extension is your core application.
 * All sub-applications and extensions are attached to this app.
 */
class App extends Extension
{
    /**
     * Constructor.
     * @param app {Application}
     * @param config Function
     */
    constructor(app,config)
    {
        super(app);

        app.use(config('use'));

        this.package = require('../package.json');

        this.use(require('grenade/expressway'), {});

        this.routes.use(config('routes'));
    }

    /**
     * Fired when the application boots.
     * @param next Function
     * @param controller Function
     * @param app {Application}
     */
    boot(next,controller,app,Device)
    {
        this.webpack.entry('main.js');
        this.webpack.attach(controller('IndexController'));

        app.call(installer);
        Device.all().then(devices => {
            app.service('deviceCollection', devices);
            this.webpack.server().then(done => {
                super.boot(next);
            });
        });
    }
}

function installer(seeder,paths,app)
{
    seeder.add('installer', {
        dump:true,
        path:paths.db('seeds'),
        add: {Device: 'devices.csv'},
        parsed(data,installer) {
            let carriers = ['Sprint','Verizon','AT&T', 'TMobile'];
            let devices = data.Device.map(device => {
                return carriers.map(carrier => {
                    return _.assign({},device,{carrier: carrier});
                })
            });
            let arr = _.flatten(devices);
            installer.get('Device').data = arr;
        }
    });
}

module.exports = App;