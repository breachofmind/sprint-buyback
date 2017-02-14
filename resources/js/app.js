// App code
require('../scss/app.scss');

var Vue = require('vue');
var $http = require('./api');
var store = require('./store');
var utils = require('./utils');
var _ = require('lodash');

[   'loader',
    'icon',
    'custom-checkbox',
    'custom-radio',
    'selector',
    'button-group',
    'selection-panel',
    'inspection-panel',
].forEach(component => {
    Vue.component(component, require('./vue/'+component+".vue"));
});

Vue.directive('scroll', {
    inserted: function(el)
    {
        var id = el.getAttribute('href');
        el.addEventListener('click', function(event) {
            event.preventDefault();
            utils.scrollTo(id.replace("#",""));
        });
    }
})


var app = new Vue({
    store,
    el: "#Application",
    created: function() {
        this.$store.commit('fetch');
    },
    computed: {
        selections: function()
        {
            return this.$store.state.selections;
        },

        selectedDevice: function()
        {
            return this.$store.getters.selectedDevice;
        }
    }
});
