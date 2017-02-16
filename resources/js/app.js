// App code
require('../scss/app.scss');

var Vue = require('vue');
var store = require('./store');
var utils = require('./utils');
var $http = require('axios');
var SERIAL_NUMBER_MINLENGTH = 5;

[   'loader',
    'icon',
    'custom-checkbox',
    'custom-radio',
    'selector',
    'button-group',
    'selection-panel',
    'inspection-panel',
    'quote-panel',
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
});
Vue.filter('currency', function(value) {
    return "$"+value;
});

var app = new Vue({
    store,
    el: "#Application",
    created: function() {
        this.$store.commit('fetch');
    },
    data: {
        serialNumber: "",
        submitting: false,
    },
    computed: {
        selections: function()
        {
            return this.$store.state.selections;
        },

        selectedDevice: function()
        {
            return this.$store.state.selectedDevice;
        }
    },

    methods: {
        toggleNav: function(open)
        {
            if (typeof open != 'boolean') {
                open = !this.$store.state.nav;
            }
            this.$store.state.nav = open;
        },

        lookupSerial: function(event)
        {
            if (this.serialNumber.length < SERIAL_NUMBER_MINLENGTH || this.submitting) {
                return;
            }

            this.submitting = true;
            $http.post('/device/serial', this.serialNumber).then(response => {
                window.setTimeout(timer => {
                    this.$store.commit('device', {
                        device: response.data,
                        serialNumber: this.serialNumber
                    });
                    this.submitting = false;
                    // Scroll to the inspection area.
                    utils.scrollTo('InspectionPanel');
                }, 2000);
            });

        }
    }
});
