// App code
require('../scss/app.scss');

var Vue = require('vue');
var $http = require('./api');
var store = require('./store');
var _ = require('lodash');

[   'loader',
    'icon',
    'custom-checkbox',
    'custom-radio',
    'selector',
    'selection-panel',
].forEach(component => {
    Vue.component(component, require('./vue/'+component+".vue"));
});


var app = new Vue({
    store,
    el: "#Application",
    created: function() {
        this.$store.commit('fetch');
    },
    methods: {
        unique(property)
        {
            var devices = this.$store.state.devices;
            return _.uniqBy(devices, device => {
                return device[property];
            }).map(device => {
                return {label:device[property], value:device}
            });
        }
    }
});
